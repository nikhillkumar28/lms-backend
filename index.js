import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import dbConnect from "./config/db.js";
import userRouter from "./routers/userRoute.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("LMS API is running..."));

app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server!" });
});

const startServer = async () => {
  try {
    await dbConnect();
    app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
  } catch (err) {
    console.error(" Failed to start server:", err.message);
    process.exit(1); 
  }
};

startServer();