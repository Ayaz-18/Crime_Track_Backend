import { Router } from "express";
import { User_sign_up ,User_signin,User_signout} from "../controllers/User.controller.js";

const userroute=Router()

userroute.post("/user-signup",User_sign_up);
userroute.post("/user-login",User_signin);
userroute.post("/user-signout",User_signout)
export {userroute}