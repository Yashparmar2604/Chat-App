import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from "../jwt/generateToken.js";
import ImageKit from "imagekit";
import fs from "fs/promises";

import dotenv from "dotenv"
dotenv.config();







const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

export const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;

  

  let photoUrl="";
  try {

    if (!fullname || !email || !password || !confirmPassword) {
  return res.status(400).json({ error: "All fields are required" });
}

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }

    const username=await User.findOne({ fullname});

     if (username) {
      return res.status(400).json({ error: "User Name already exits" });
    }



     if (photoUrl) {
      const uploadResponse = await imagekit.upload({
        file: photoUrl, // base64 string
        fileName: `${fullname.replace(/\s/g, "_")}_${Date.now()}.jpg`,
        folder: "/chat-app-users",
      });
      photoUrl = uploadResponse.url;
    }


    // Hashing the password
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      fullname,
      email,
      password: hashPassword,
      photo:photoUrl
    });
    await newUser.save();
    if (newUser) {
     const token = createTokenAndSaveCookie(newUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
          photo:newUser.photo,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ error: "Invalid user credential" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({ error: "Invalid password " });
    }
    const token = createTokenAndSaveCookie(user._id, res);
    res.status(201).json({
      message: "User logged in successfully",
      token,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
  }
};
