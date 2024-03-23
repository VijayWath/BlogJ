import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

import {checkForAuthCookie} from "./middlewares/autj.js"
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";

const app = express();
const PORT = 3000 || process.env.PORT;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(checkForAuthCookie("token"));

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/", (req, res) => {
  res.render("home.ejs", { user: req.user });
});

app.get("/logout",(req,res)=>{
    res.clearCookie("token").redirect("/")
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
