
import express from "express";
import cors from "cors";




export const app = express();

// middleware
app.use(cors());
app.use(express.json()); // to parse incoming JSON

// default route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to SWIPO Event Management Backend");
});

// TODO: Mount all routes here
// app.use("/api/auth", authRoutes);
// app.use("/api/events", eventRoutes);

