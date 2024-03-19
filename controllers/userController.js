import db from "../postgressSetup.js"
import { createHmac } from 'node:crypto';
import dotenv from'dotenv';

dotenv.config();

async function handelUserSignIn(req,res){
   return res.render("signIn")
}

async function handelUserSignup(req,res){
   return res.render("signup.ejs")
}

async function PostHandelUserSignup(req,res){
    const { fullName,email,password } = req.body
    const secrete = process.env.HASH_SECRETE;
    const hashedPassword = createHmac('sha256', secrete)
               .update(password)
               .digest('hex');
    await db.query("INSERT INTO users(fullName,email,password) VALUES($1,$2,$3)",[fullName,email,hashedPassword])
    return res.redirect("/")
}

async function PostHandelUserSignIn(req,res){
    const {email,password } = req.body
    const secrete = process.env.HASH_SECRETE;
    const hashedPassword = createHmac('sha256', secrete)
               .update(password)
               .digest('hex');
  await db.query("SELECT * FROM users WHERE email = $1 AND password = $2", [email, hashedPassword],(err,res)=>{
        if(err){
            console.log("postgtess error")
        }else{
            const user = res.rows[0]
            console.log(user)
            if(!user){
                return res.json({error:"email or pass is wrong"})
            }
        }
    });
    return res.redirect("/")   
    
}

export {handelUserSignIn,handelUserSignup ,PostHandelUserSignup,PostHandelUserSignIn}