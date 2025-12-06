import { Response } from "express";
import { AuthRequest } from "../middleware/authGuard";
import { ContentService } from "../services/content.service";
import { ContentStatus } from "../schemas/content.schema";

export const generateContent = async (req: AuthRequest, res: Response) => {
  const { prompt, type } = req.body;
  if (!prompt || !type)
    return res.status(400).json({ message: "prompt and type required" });

  try {
    const content = await ContentService.generateContent(
      req.user.id,
      prompt,
      type  
    );
    return res.status(202).json({
      message: "Content generation queued !",
      jobId: content.jobId,
      expectedDelay: 1, 
      contentId: content._id,
      status: content.status,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
// GET /api/content/type-stats
export const getTypeStats = async (req: AuthRequest, res: Response) => {
  console.log(req.user);
  
  try {
    const stats = await ContentService.getTypeStats(req.user.id);
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/content/job/:jobId/status
export const getJobStatus = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const content = await ContentService.getJobStatus(id, req.user.id);

    res.json({
      contentId: content?._id,
      jobId: content?.jobId,
      status: content?.status,
      generatedText: content?.status === ContentStatus.DONE ? content.generatedText : null,
      error: content?.error || null,
    });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

// GET /api/content/jobs?status=
export const listJobs = async (req: AuthRequest, res: Response) => {
  const { status } = req.query;

  let statusFilter: ContentStatus | undefined = undefined;
  if (status && Object.values(ContentStatus).includes(status as ContentStatus)) {
    statusFilter = status as ContentStatus;
  }
console.log(req.user);

  try {
    const jobs = await ContentService.listJobs(req.user.id, statusFilter);
    res.json(jobs);
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
    const updated = await ContentService.updateContent(id, req.user.id, {
      title,
      prompt,
      type,
    });
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
