
import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";


export const app = express();


app.use(cors());
app.use(express.json()); 
app.use(cookieParser())

import userRoutes from './routes/user.routes.js'


app.use("/api/v1/user", userRoutes);

