import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register user
export const register = async (req, res) => {
    try {
      const { fullname, email, password, phoneNumber, role } = req.body;

    if (!fullname || !email || !password || !phoneNumber || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }
    //convert password to hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName: fullname,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
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
        sameSite: "strict",
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
      .cookie("token", "", {maxAge: 0,})
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error("Error in logout controller:", error);
    return res
      .status(500)
      .json({ message: "Internal server error in logout", success: false });
  }
};

export const updateProfile = async (req, res) => {
    try{
        const { fullName, phoneNumber, email, bio, skills } = req.body;
        const file = req.file; // resume file

    //cloudinary upload logic here

        let skillsArray = skills ? skills.split(",").map(skill => skill.trim()) : [];
        const userId = req.userId; // middleware authentication se set hua hai
        let user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found", success: false});
        }

        //update database profile fields
        if(fullName){
            user.fullName = fullName; 
        }
        if(phoneNumber){
            user.phoneNumber = phoneNumber;
        }
        if(email){
            user.email = email;
        }
        if(bio){
            user.profile.bio = bio;
        }
        if(skillsArray.length > 0){
            user.profile.skills = skillsArray;
        }

        //resume
        await user.save();

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
          };
        return res.status(200).json({message: "Profile updated successfully", success: true, user});
    }catch(error){
        console.error("Error in updateProfile controller:", error);
    return res
      .status(500)
      .json({ message: "Internal server error in updateProfile", success: false });
    }
}