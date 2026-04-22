import User from "../models/User.models.js";
import { encrypt,decrypt,hash } from "../utils/Encryption.js";
import jwt from 'jsonwebtoken';


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

const User_signin = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "please enter email and password"
      });
    }

    const hash_email = hash(email);

    const user = await User.findOne({ hash_email });

    if (!user) {
      return res.status(404).json({
        msg: "User not exist, sign up first"
      });
    }

    // check password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        msg: "Invalid credentials"
      });
    }

    // create JWT token
    const token = jwt.sign(
      { hash_email: user.hash_email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .status(200)
      .json({
        msg: "user logged in successfully"
      });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong"
    });
  }
};
const User_signout = (req, res) => {
  res.clearCookie("token").json({
    msg: "user logged out successfully"
  });
}


export  {User_sign_up,User_signin,User_signout}