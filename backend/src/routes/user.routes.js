import { Router } from "express";
import { loginUser, registerUser, verifyAdminOTP } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/verify-otp").post(verifyAdminOTP)


export default router