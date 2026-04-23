import { Router } from "express";
import { User_sign_up ,User_signin,User_signout,forgot_password} from "../controllers/User.controller.js";
import auth_user from "../middilwares/Auth_middleware.js";

const userroute=Router()

userroute.post("/user-signup",User_sign_up);
userroute.post("/user-login",User_signin);
userroute.post("/user-signout",auth_user,User_signout)
userroute.post("/forgot-password",forgot_password);
export {userroute}