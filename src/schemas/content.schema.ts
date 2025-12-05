import { Schema } from "mongoose";

export enum ContentStatus {
  QUEUED = 'queued',
  PROCESSING = 'processing',
  DONE = 'done',
  FAILED = 'failed'
}

export const ContentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  prompt: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, enum: Object.values(ContentStatus), default: ContentStatus.QUEUED },
  jobId: { type: String },
  generatedText: { type: Schema.Types.Mixed },
  error: { type: String }
}, { timestamps: true, versionKey: false });
