import mongoose from "mongoose";

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) return; 

  if (!process.env.MONGO_URI) {
    console.error("❌ Error: MONGO_URI is undefined. Check Vercel Settings!");
    return;
  }

  try {
    console.log("⏳ Attempting to connect to MongoDB...");
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4 // Kill the wait after 5 seconds
    });
    isConnected = db.connections[0].readyState;
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
  }
};

export default dbConnect;