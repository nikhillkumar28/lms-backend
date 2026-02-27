import dotenv from "dotenv";
dotenv.config(); 

import express from "express";
import cors from "cors";
import dbConnect from "./config/db.js";
import userRouter from "./routers/userRoute.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
dbConnect();

// Routes
app.get("/", (req, res) => res.send("LMS API is running..."));
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong on the server!" });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

export default app;