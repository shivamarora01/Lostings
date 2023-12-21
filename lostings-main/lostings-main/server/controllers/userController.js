const User = require("../models/userModel.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const ErrorHandler = require("../utils/errorHandler.js");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("../utils/cloudinaryConfig.js");

exports.registerUser = catchAsyncError(async (req, res, next) => {
  if (!req.files) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  try {
    const result = await cloudinary.uploader.upload(req.files.avatar.path, {
      folder: "lostings", 
    });
    const user = await User.create({
      ...req.fields,
      avatar:{
          url: result.secure_url, 
          public_id:result.public_id
      }

    });
    const token = user.getJWTToken();
    res.status(201).json({ userId: user.id, email:user.email, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
  
  
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const token = user.getJWTToken();
  res.status(201).json({ userId: user.id, email, token });
});

exports.logout = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("No user found with the mail", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.body.url}/${resetToken}`;
  const message = `Your reset password link is ${resetPasswordUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Lostings Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `reset password email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("Reset Password link is invalid or expired", 400)
    );
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password and ConfirmPassword doesn't match", 400)
    );
  }
  user.password = req.body.newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  const token = user.getJWTToken();
  res.status(201).json({ userId: user.id, email:user.email, token });
});

exports.getMyDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.userData.userId);
  res.status(200).json({
    success: true,
    user,
  });
});


exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.userData.userId).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("password and confirm password doesn't match", 400)
    );
  }

  user.password = req.body.newPassword;
  await user.save();
  const token = user.getJWTToken();
  res.status(201).json({ userId: user.id, email: user.email, token });
});

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.userData.userId, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});
