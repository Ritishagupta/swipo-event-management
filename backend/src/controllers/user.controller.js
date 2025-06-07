import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateOTP } from "../utils/generateOtp.js";

import crypto from "crypto";

const registerUser = AsyncHandler(async (req, res) => {
  try {
    const { name, email, username, password, role } = req.body;

    if (
      [name, email, username, password, role].some(
        (field) => field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      throw new ApiError(409, "Email or Username already exists");
    }

    if (role === "admin") {
      const existingAdmin = await User.findOne({ role: "admin" });

      if (existingAdmin) {
        throw new ApiError(
          403,
          "Admin already exists. You cannot create another admin."
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      role,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          username: newUser.username,
          role: newUser.role,
        },
        "User registered successfully"
      )
    );
  } catch (error) {
    throw new ApiError(500, error.message || "Internal Server Error");
  }
});

const loginUser = AsyncHandler(async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if ([username, password, role].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ username });

    if (!user) {
      throw new ApiError(404, "Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new ApiError(404, "Invalid credentials");
    }

    // 4. Role mismatch
    if (user.role !== role) {
      throw new ApiError(403, "Role mismatch");
    }

    if (role === "admin") {
      const otp = generateOTP();
      const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 mins from now

      user.otp = otp;
      user.otpExpiry = expiry;
      await user.save();

      const emailData = {
        subject: "OTP Verification",
        text: `Your One Time Password (OTP) for verification is ${otp}. This OTP will be valid only for 5 minutes`,
      };

      await sendEmail(user.email, emailData);

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            {_id:user._id},
            "OTP sent to admin email. Please verify to login."
          )
        );
    }

    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const options = {
      secure: process.env.NODE_ENV === "production", // Secure cookie only in production
      httpOnly: true,
    };

    return res
      .status(200)
      .cookie("token", token, options)
      .json(
        new ApiResponse(
          200,
          {
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
          },
          "Loggedin successfully..."
        )
      );
  } catch (error) {
    throw new ApiError(500, error.message || "Internal server error");
  }
});

// Controller for admin
const verifyAdminOTP = AsyncHandler(async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!(userId && otp)) {
      throw new ApiError(400, "All fields are required");
    }

    const admin = await User.findById(userId);
    if (!admin || admin.role !== "admin") {
      throw new ApiError(404, "Invalid access");
    }

    if (!admin.otpExpiry || new Date() > admin.otpExpiry) {
      throw new ApiError(401, "OTP has expired. Please login again.");
    }

    if (admin.otp !== otp) {
      throw new ApiError(401, "Invalid OTP");
    }

    admin.otp = null;
    admin.otpExpiry = null;
    await admin.save();

    const token = jwt.sign(
      {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        username: admin.username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    const options = {
      secure: process.env.NODE_ENV === "production", // Secure cookie only in production
      httpOnly: true,
    };

    return res
      .status(200)
      .cookie("token", token, options)
      .json(
        new ApiResponse(
          200,
          {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            username: admin.username,
          },
          "Loggedin as admin successfully..."
        )
      );
  } catch (error) {
    throw new ApiError(500, error.message || "Internal server error");
  }
});

const forgotPassword = AsyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Validate input
    if (!email?.trim()) {
      throw new ApiError(400, "Email is required");
    }

    // 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User not found with this email");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = tokenExpiry;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const emailData = {
      subject: "SWIPO Password Reset",
      text: `Click the link below to reset your password:\n\n${resetLink}\n\nThis link will expire in 15 minutes.`,
    };

    const { success } = await sendEmail(user.email, emailData);

    if (!success) {
      throw new ApiError(500, "internal server error. please try again");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "resent link sent to the email"));
  } catch (error) {
    throw new ApiError(500, error.message || "Internal server error");
  }
});

const verifyAndResetForgotPassword = AsyncHandler(async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;

    if (!resetToken || !newPassword?.trim()) {
      throw new ApiError(400, "Reset token and new password are required");
    }

    const user = await User.findOne({ resetPasswordToken: resetToken });

    if (!user) {
      throw new ApiError(404, "Invalid or expired reset token");
    }

    if (user.resetPasswordExpiry < new Date()) {
      throw new ApiError(409, "Reset token has expired");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpiry = null;

    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password reset successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Internal Server Error");
  }
});

const updatePassword = AsyncHandler(async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;


    if (!userId || !oldPassword || !newPassword) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      throw new ApiError(409, "Old password is incorrect. Please try again");
    }

   
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

 
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password updated successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Internal Server Error");
  }
});


const logoutUser = AsyncHandler(async (req, res) => {


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("token", options)
        .json(
            new ApiResponse(200, {}, "User logged Out")
        )
})

export {
  registerUser,
  loginUser,
  verifyAdminOTP,
  forgotPassword,
  verifyAndResetForgotPassword,
  updatePassword,
  logoutUser
};
