import User from "../models/User.models.js";
import { encrypt,decrypt,hash } from "../utils/Encryption.js";


const User_sign_up=async(req,res)=>{
   try {
     const{email,password}=req.body
     const encrypted_email=encrypt(email);
     const hash_email=hash(email);
     const exist_user=await User.findOne({hash_email});
     if(exist_user){
         return res.status(400).json({
             msg:"user exist"
         })
     }
     const user=await User.create(
         {
             enc_email:encrypted_email,
             hash_email:hash_email,
             password
         }
     )
     res.json({msg:"signup success"})
   } catch (error) {
    console.log(error)
    res.status(500).json({
        error:"Somthing went wrong"
    })
   }
}
const User_signin=async(req,res)=>{
    const{email,password}=req.body;
    if(!email||!password){
        return res.status(401).jsaon({
            msg:"please ennter email and password"
        })
    }
    const hash_email=await hash(email);
    const user=await User.findOne({hash_email}).select("-password -enc_email");
    if(!user){
        return res.status(402).json({
            msg:"User not exist sign up first"
        })
    }
    res.status(200).json({
        user:user,
        msg:"user loged in successfully"
    })

}

export  {User_sign_up,User_signin}