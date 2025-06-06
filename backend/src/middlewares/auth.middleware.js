import jwt from "jsonwebtoken";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.models.js";

export const verifyJWT = AsyncHandler(async (req, _, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new ApiError(401, "Unauthorized. Token not provided.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?._id) {
      throw new ApiError(401, "Invalid token structure.");
    }

    const user = await User.findById(decoded._id).select("-password");
    if (!user) {
      throw new ApiError(401, "User not found with this token.");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    throw new ApiError(401, "Access denied. Invalid or expired token.");
  }
});
