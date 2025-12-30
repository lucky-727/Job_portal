import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import authenticateToken from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register",singleUpload, register)
router.post("/login", login)
router.get("/logout", logout)
router.post("/profile/update",authenticateToken, updateProfile)

export default router;