import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'


const registerUser = async(req,res)