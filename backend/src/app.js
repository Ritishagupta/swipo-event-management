
import express from "express";
import cors from "cors";




export const app = express();


app.use(cors());
app.use(express.json()); 

import userRoutes from './routes/user.routes.js'


app.use("/api/v1/user", userRoutes);

