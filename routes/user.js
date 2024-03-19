import expess from "express";
import {handelUserSignIn,handelUserSignup ,PostHandelUserSignup,PostHandelUserSignIn} from "../controllers/userController.js"

const userRouter = expess.Router();

userRouter.get('/signin',handelUserSignIn)
userRouter.get('/signup',handelUserSignup)
userRouter.post('/signup',PostHandelUserSignup)
userRouter.post('/signin',PostHandelUserSignIn)

export default userRouter