import mongoose,{Schema} from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto"
import { type } from "os";

const userSchema = new Schema({
    enc_email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    hash_email:{
        type:String,
        required:true
    },
    isVerified:{
        type:String,
        default:"false"
    }
});
userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model("User", userSchema);
export default User;