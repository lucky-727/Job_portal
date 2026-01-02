import { Company } from "../models/company.model.js";
import cloudinary from '../utils/cloud.js';
import getDataUri from "../utils/dataUri.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName ,description} = req.body;
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Company name is required", success: false });
    }
    let company = await Company.findOne({ companyName});
    if (company) {
      return res
        .status(400)
        .json({ message: "Company already registered", success: false });
    }
    company = await Company.create({
      companyName,
      description,
      userId: req.userId,
    });
    return res.status(200).json({
      message: `Company ${company.companyName} registered successfully`,
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error in registerCompany controller:", error);
    return res.status(500).json({
      message: "Internal server error in registerCompany",
      success: false,
    });
  }
};

export const getAllCompanies = async (req, res) => {
  try {
    const userId = req.userId; // logged in user id from middleware
    const companies = await Company.find({ userId });
    if (!companies || companies.length === 0) {
      return res
        .status(404)
        .json({ message: "No companies found for this user", success: false });
    }
    return res
      .status(200)
      .json({
        message: "Companies fetched successfully",
        success: true,
        companies,
      });
  } catch (error) {
    console.error("Error in getAllCompanies controller:", error);
    return res
      .status(500)
      .json({
        message: "Internal server error in getAllCompanies",
        success: false,
      });
  }
};

//get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res
      .status(200)
      .json({
        message: "Company fetched successfully",
        success: true,
        company,
      });
  } catch (error) {
    console.error("Error in getCompanyById controller:", error);
    return res
      .status(500)
      .json({
        message: "Internal server error in getCompanyById",
        success: false,
      });
  }
};

//update company details
export const updateCompany = async (req, res) => {
  try {
    const { companyName , description, website, location } = req.body;
    const file = req.file; // logo file
    //cloudinary upload logic here

     const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    const logo = cloudResponse.secure_url;

    const updateData = { companyName, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData,{new: true,});
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res
      .status(200)
      .json({
        message: "Company updated successfully",
        success: true,
        company,
      });
  } catch (error) {
    console.error("Error in updateCompany controller:", error);
    return res
      .status(500)
      .json({
        message: "Internal server error in updateCompany",
        success: false,
      });
  }
};
