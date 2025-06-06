import { Router } from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
  verifyAdminOTP,
  verifyAndResetForgotPassword,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify-otp").post(verifyAdminOTP);
router.route("/forgot-password").get(forgotPassword);
router.route("/verify-forgot-password").post(verifyAndResetForgotPassword);
router.route("/update-password").post(updatePassword);
router.route("/logout").post(verifyJWT,logoutUser);

export default router;
