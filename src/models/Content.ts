import mongoose, { Document, Model } from "mongoose";
import { ContentSchema, ContentStatus } from "../schemas/content.schema";

export interface IContent extends Document {
  userId: mongoose.Types.ObjectId;
  title?: string;
  prompt: string;
  type: string;
  status: ContentStatus;
  jobId?: string;
  generatedText?: string;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

const Content: Model<IContent> = mongoose.model<IContent>("Content", ContentSchema);

export default Content;
