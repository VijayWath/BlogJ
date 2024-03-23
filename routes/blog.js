import express from "express";
import {handleAddBlog} from "../controllers/blogController.js"
import upload from "../storageInstance.js";

const blogRouter = express.Router()

blogRouter.get("/addBlog",(req,res)=>{
    return res.render("addBlog.ejs",{user:req.user});
})

blogRouter.post("/addBlog",upload.single('coverImage'),handleAddBlog)

export default blogRouter;