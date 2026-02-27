import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
//import dotenv from "dotenv"
const SECRET = process.env.JWT_SECRET;

const signup = async (req, res) => {
  try {
    // Destructure for safety
    const { name, email, password, role } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    
    // Create the user using the destructured data
    const result = await userModel.create({
      name,
      email,
      password: hashPassword,
      role
    });

    res.status(201).json({ message: "User Created" });
  } catch (err) {
    console.log("Signup Error:", err.message);
    res.status(400).json({ message: "Unable to create user", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. MUST use await here
    const found = await userModel.findOne({ email });

    if (!found) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Compare passwords
    const chkPassword = await bcrypt.compare(password, found.password);
    
    if (!chkPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Create payload using data FROM the database object 'found'
    const payload = {
      id: found._id,
      name: found.name,
      email: found.email,
      role: found.role,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login Success", token });

  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const showUsers = async (req, res) => {
  try {
    const result = await userModel.find().select("-password"); // Don't send passwords back!
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export { login, signup, showUsers, deleteUser };