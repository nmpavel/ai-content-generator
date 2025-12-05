import { Response } from "express";
import { AuthRequest } from "../middleware/authGuard";
import { ContentService } from "../services/content.service";

export const generateContent = async (req: AuthRequest, res: Response) => {
  const { prompt, type } = req.body;
  if (!prompt || !type) return res.status(400).json({ message: "prompt and type required" });

  try {
    const content = await ContentService.generateContent(req.user.id, prompt, type);
    res.status(201).json({ message: "Content generated successfully", content });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserContent = async (req: AuthRequest, res: Response) => {
  try {
    const contents = await ContentService.getUserContent(req.user.id);
    res.json(contents);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getContentById = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const content = await ContentService.getContentById(id, req.user.id);
    res.json(content);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const updateContent = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { title, prompt, type } = req.body;

  try {
    const updated = await ContentService.updateContent(id, req.user.id, { title, prompt, type });
    res.json({ message: "Content updated successfully", content: updated });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const deleteContent = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    await ContentService.deleteContent(id, req.user.id);
    res.json({ message: "Content deleted successfully" });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
