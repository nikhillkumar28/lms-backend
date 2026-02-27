import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    
    const uri = process.env.MONGO_URI;
    const conn = await mongoose.connect(uri);
    
    console.log(` MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(` MongoDB Connection Error: ${error.message}`);
    throw error; 
  }
};

export default dbConnect;