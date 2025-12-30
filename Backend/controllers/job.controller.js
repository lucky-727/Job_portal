import { Job } from "../models/job.models.js";

//admin can post job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
      position,
      companyId,
      experience,
    } = req.body;
    const userId = req.userId;
    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !salary ||
      !jobType ||
      !position ||
      !companyId ||
      experience === undefined
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(",").map((req) => req.trim()),
      experienceLevel: experience,
      location,
      salary: Number(salary),
      jobType,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(200).json({
      message: `Job ${job.title} posted successfully`,
      success: true,
      job,
    });
  } catch (error) {
    console.error("Error in postJob controller:", error);
    return res.status(500).json({
      message: "Internal server error in postJob",
      success: false,
    });
  }
};

//users can view all jobs
export const getAllJobs = async (req, res) => {
  try {
    const keywords = req.query.keywords || "";
    const query = {
        $or: [
            { title: { $regex: keywords, $options: "i" } },
            { description: { $regex: keywords, $options: "i" } }, 
        ],
    };
    const jobs = await Job.find(query).populate({
        path: "company",
    }).sort({ createdAt: -1 });
    if (!jobs || jobs.length === 0) {
      return res
        .status(404)
        .json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({
      message: "Jobs fetched successfully",
      success: true,
      jobs,
    });
     
} catch (error) {
    console.error("Error in getAllJobs controller:", error);
    return res.status(500).json({
      message: "Internal server error in getAllJobs",
      success: false,
    });
  }
};


export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({
      message: "Job fetched successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.error("Error in getJobById controller:", error);
    return res.status(500).json({message: "Internal server error in getJobById", success: false,});
  } 
};

//admin job created
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.userId;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found for this admin", success: false });
    }
    return res.status(200).json({
      message: "Admin jobs fetched successfully",
      success: true,
      jobs,
    });
  } catch (error) {
    console.error("Error in getAdminJobs controller:", error);
    return res.status(500).json({message: "Internal server error in getAdminJobs", success: false,});
  }
};
