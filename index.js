import express from "express";
import path from "path";

import  userRouter  from "./routes/user.js";

const app = express();
const PORT = 3000 || process.env.PORT

app.set('view engine','ejs');
app.set('views',path.resolve('./views'))

app.use(express.urlencoded({extended:false}))
app.use('/user',userRouter)

app.get('/',(req,res)=>{
    res.render("home.ejs")
})


app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})