const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String, 
        required: [true, "Enter your name"],
    },
    email:{
        type:String, 
        required:[true, "Enter your email"],
        validator:[validator.isEmail,"Please enter a valid email"],
        unique:true
    },
    password:{
        type:String,
        select:false,
        required:[true,"Enter your password"],
        minLength:[8,"password should be atleast 8 characters"]
    },
    avatar:{
        public_id:{
            type:String, 
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    contact:{
       type:String, 
      //  required:[true,"Enter your Contact No."]
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){next()}; 
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  };

module.exports = mongoose.model("User", userSchema);