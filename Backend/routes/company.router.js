import express from "express";
import { getAllCompanies, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/register",authenticateToken,registerCompany);
router.get("/get",authenticateToken,getAllCompanies);
router.get("/get/:id",authenticateToken,getCompanyById);
router.put("/update/:id",authenticateToken,updateCompany);

export default router;