const express = require("express");
const {registerUser, loginUser, logout, forgotPassword, resetPassword, getMyDetails,getUserDetails, updatePassword, updateProfile} = require("../controllers/userController.js");
const {isAuthenticatedUser} = require("../middleware/auth.js");
const router = express.Router();
const expressFormidable =require("express-formidable");

router.route("/register").post(expressFormidable({maxFieldsSize:5*1024*1024}), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/user/:id").get(getUserDetails);
router.route("/me").get(isAuthenticatedUser,getMyDetails);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);

module.exports = router;