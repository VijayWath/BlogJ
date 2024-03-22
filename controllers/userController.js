import db from "../postgressSetup.js";
import { createHmac } from "node:crypto";
import dotenv from "dotenv";
import { validateToken, createToken } from "../auth.js";

dotenv.config();

async function handelUserSignIn(req, res) {
  return res.render("signIn");
}

async function handelUserSignup(req, res) {
  return res.render("signup.ejs");
}

async function PostHandelUserSignup(req, res) {
  const { fullName, email, password } = req.body;
  const secrete = process.env.HASH_SECRETE;
  const hashedPassword = createHmac("sha256", secrete)
    .update(password)
    .digest("hex");
  try {
    await db.query(
      "INSERT INTO users(fullName,email,password) VALUES($1,$2,$3)",
      [fullName, email, hashedPassword]
    );
  
    const user = await db.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
        [email, hashedPassword]
    );
    const token = createToken(user.rows[0]);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.log(`error while signup:${error}`)
  }
}

async function PostHandelUserSignIn(req, res) {
  const { email, password } = req.body;
  const secrete = process.env.HASH_SECRETE;
  const hashedPassword = createHmac("sha256", secrete)
    .update(password)
    .digest("hex");

  try {
    const result = await db.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, hashedPassword]
    );
    const user = result.rows[0];

    if (!user) {
      return res.render("signin", { error: "incorrect pass or email" });
    }

    const token = createToken(user);
    return res.cookie("token", token).redirect("/");
  } catch (err) {
    console.error("postgress error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export {
  handelUserSignIn,
  handelUserSignup,
  PostHandelUserSignup,
  PostHandelUserSignIn,
};
