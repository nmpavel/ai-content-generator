import { Router } from "express";
import { generateContent, getContentById, updateContent, deleteContent, listJobs, getJobStatus, getTypeStats } from "../controllers/content.controller";
import { authGuard } from "../middleware/authGuard";


const router = Router();

// Protected routes
router.post("/generate", authGuard, generateContent);
router.get("/", authGuard, listJobs);
router.get("/:id/status", authGuard, getJobStatus);
router.get("/:id", authGuard, getContentById);
router.put("/:id", authGuard, updateContent);
router.delete("/:id", authGuard, deleteContent);
router.get("/stats/type", authGuard, getTypeStats);


export default router;
