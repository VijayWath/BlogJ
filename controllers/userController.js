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
  await db.query(
    "INSERT INTO users(fullName,email,password) VALUES($1,$2,$3)",
    [fullName, email, hashedPassword]
  );
  return res.redirect("/");
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
    console.log(token);

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
