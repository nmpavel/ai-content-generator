import mongoose from "mongoose";
import { contentQueue } from "../core/queue";
import Content, { IContent } from "../models/Content";
import { ContentStatus } from "../schemas/content.schema";

export class ContentService {
  static async generateContent(
    userId: string,
    prompt: string,
    type: string
  ): Promise<IContent> {
    const content = await Content.create({
      userId: new mongoose.Types.ObjectId(userId),
      prompt,
      type,
      status: ContentStatus.QUEUED,
    });

    const job = await contentQueue.add(
      "generate",
      {
        _id: content._id.toString(),
        prompt,
        type,
      },
      {
        delay: 60000, // 1 minute
      }
    );

    if (job?.id) {
      content.jobId = job.id.toString();
      await content.save();
    }

    return content;
  }

  static async getTypeStats(userId: string) {
    const stats = await Content.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        }
      }
    ]);

    return stats.map(s => ({
      type: s._id,
      count: s.count,
    }));
  }

 static async listJobs(userId: string, status?: ContentStatus, search?: string) {
  const filter: any = { userId: new mongoose.Types.ObjectId(userId) };

  if (status) filter.status = status;

  if (search) {
    filter.$or = [
      { prompt: { $regex: search, $options: "i" } },
      { type: { $regex: search, $options: "i" } },
    ];
  }

  const jobs = await Content.find(filter).sort({ createdAt: -1 });
  return jobs;
  }

  static async getJobStatus(jobId: string, userId: string) {
    return Content.findOne({
      jobId,
      userId: new mongoose.Types.ObjectId(userId)
    });
  }

  static async getContentById(contentId: string, userId: string) {
    return Content.findOne({
      _id: new mongoose.Types.ObjectId(contentId),
      userId: new mongoose.Types.ObjectId(userId)
    });
  }

  static async updateContent(
    contentId: string,
    userId: string,
    updateData: Partial<{ title: string; prompt: string; type: string }>
  ) {
    const content = await Content.findOne({
      _id: new mongoose.Types.ObjectId(contentId),
      userId: new mongoose.Types.ObjectId(userId)
    });

    if (!content) throw new Error("Content not found!");

    Object.assign(content, updateData);
    await content.save();
    return content;
  }

  static async deleteContent(contentId: string, userId: string) {
    await Content.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(contentId),
      userId: new mongoose.Types.ObjectId(userId)
    });
  }
}
