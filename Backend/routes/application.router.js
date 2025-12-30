import express from 'express';
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/application.controller.js';
import authenticateToken from '../middleware/isAuthenticated.js';

const router = express.Router();

router.get("/apply/:id",authenticateToken, applyJob);
router.get("/get", authenticateToken, getAppliedJobs);
router.get("/:id/applicants", authenticateToken, getApplicants);
router.post("/status/:id/update", authenticateToken, updateStatus);

export default router;