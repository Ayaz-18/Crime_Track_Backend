import User from "../models/User.models.js";
import { encrypt,decrypt,hash } from "../utils/Encryption.js";
import jwt from 'jsonwebtoken';
import transporter from "../utils/Mail_transporteer.js";
import { generateOTP } from "../utils/Otp.generator.js";
import otpStore from "../utils/Otp.storage.js";
import signupStore from "../utils/Signup.store.js";
const User_sign_up = async (req, res) => {
  try {

    const { email, password } = req.body;

    const hash_email = hash(email);

    const exist_user = await User.findOne({ hash_email });

    if (exist_user) {
      return res.status(400).json({
        msg: "User already exists"
      });
    }

    const otp = generateOTP();

    signupStore[email] = {
      email,
      password,
      otp,
      expires: Date.now() + 5 * 60 * 1000
    };

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your account",
      text: `Your OTP is ${otp}`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      msg: "OTP sent to your email"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong"
    });
  }
};
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
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict"
    }).status(200).json({
        msg: "user logged out successfully"
    });
}

const forgot_password = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                msg: "Please enter your email"
            });
        }
        const hash_email = hash(email);
        const user = await User.findOne({ hash_email });
        if (!user) {
            return res.status(404).json({
                msg: "User not exist"
            });
        }
        // generate reset token
        const reset_token = jwt.sign(
            { hash_email: user.hash_email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        // send reset token to user's email (you can use nodemailer or any email service)
        // for demo purpose we will return the reset token in response
        return res.status(200).json({
            msg: "Reset token generated successfully",
            reset_token
        });
    } catch (error) {
        console.log(error); 
        res.status(500).json({
            msg: "Something went wrong"
        });
    }
}





 

const verifySignupOTP = async (req, res) => {

  try {

    const { email, otp } = req.body;

    const storedData = signupStore[email];

    if (!storedData) {
      return res.status(400).json({
        msg: "Signup session expired"
      });
    }

    if (Date.now() > storedData.expires) {
      delete signupStore[email];

      return res.status(400).json({
        msg: "OTP expired"
      });
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({
        msg: "Invalid OTP"
      });
    }

    const encrypted_email = encrypt(email);
    const hash_email = hash(email);

    await User.create({
      enc_email: encrypted_email,
      hash_email: hash_email,
      password: storedData.password
    });

    delete signupStore[email];

    res.json({
      msg: "Account created successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Something went wrong"
    });
  }

};

export  {User_sign_up,User_signin,User_signout,forgot_password,verifySignupOTP};