import { Router } from "express";
import { generateContent, getUserContent, getContentById, updateContent, deleteContent } from "../controllers/content.controller";
import { authGuard } from "../middleware/authGuard";


const router = Router();

// Protected routes
router.post("/generate", authGuard, generateContent);
router.get("/", authGuard, getUserContent);
router.get("/:id", authGuard, getContentById);
router.put("/:id", authGuard, updateContent);
router.delete("/:id", authGuard, deleteContent);

export default router;
