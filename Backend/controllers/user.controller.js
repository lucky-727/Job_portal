import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloud.js";

//register user
export const register = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, role } = req.body;

    if (!fullname || !email || !password || !phoneNumber || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    //check if user already exists
    const user = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });
    console.log(user, "tessst");
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist. Email and Phone Number must be unique", success: false });
    }
    //convert password to hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName: fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,
      },
    });

    await newUser.save();
    return res.status(200).json({
      message: `Account created successfully for ${newUser.fullName}`,
      success: true,
    });
  } catch (error) {
    console.error("Error in register controller:", error);
    return res
      .status(500)
      .json({ message: "Internal server error in register", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(404)
        .json({ message: "Incorrect email or password", success: false });
    }
    //check role correctness
    if (user.role !== role) {
      return res.status(400).json({
        message: "You don't have necessary role to access this resource",
        success: false,
      });
    }

    //generate jwt token
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "lax",
      })
      .json({ message: `Welcome back ${user.fullName}`, success: true, user });
  } catch (error) {
    console.error("Error in login controller:", error);
    return res
      .status(500)
      .json({ message: "Internal server error in login", success: false });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.log("Error in logout controller:", error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, phoneNumber, email, bio, skills } = req.body;
    const file = req.file; // resume file

    console.log("Authenticated userId:", req.userId, req.body, req.file);
    //cloudinary upload logic here

    //Initialize userId at beginning
    const userId = req.userId; // middleware authentication se set hua hai

    //check if user exists
    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // process skills if it's provided
    let skillsArray = [];
    if (skills) {
      skillsArray = skills.split(",");
    }

    //update user profile fields
    if (fullname) {
      user.fullName = fullname;
    }
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    if (email) {
      user.email = email;
    }
    if (bio) {
      user.profile.bio = bio;
    }
    if (skillsArray.length > 0) {
      user.profile.skills = skillsArray;
    }

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(
        fileUri.content,
        { resource_type: "raw" } // IMPORTANT for PDF
      );
      //resume
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    //save updated user
    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res
      .status(200)
      .json({ message: "Profile updated successfully", success: true, user });
  } catch (error) {
    console.error("Error in updateProfile controller:", error);
    return res.status(500).json({
      message: "Internal server error in updateProfile",
      success: false,
    });
  }
};
