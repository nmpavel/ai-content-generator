import * as dotenv from "dotenv";
dotenv.config();

import { Worker, Job } from "bullmq";
import { redisConnection } from "../core/redis";
import Content from "../models/Content";
import { ContentStatus } from "../schemas/content.schema";
import { generateAIContent } from "../lib/aiClient";
import { connectDB } from "../core/db";


connectDB().then(() => console.log("Worker connected to MongoDB"));

export const contentWorker = new Worker(
  "content-generation",
  async (job: Job) => {
    const { _id, prompt, type } = job.data;

    console.log("Processing job:", job.id);

    const content = await Content.findById(_id);
    if (!content) return;

    content.status = ContentStatus.PROCESSING;
    await content.save();

    try {
      const generatedText = await generateAIContent(prompt, type);

      content.generatedText = generatedText;
      content.status = ContentStatus.DONE;
      await content.save();
    } catch (error: any) {
      content.status = ContentStatus.FAILED;
      content.error = error.message;
      await content.save();
      throw new Error(error.message);
    }
  },
  { connection: redisConnection }
);

contentWorker.on("completed", (job) => {
  console.log(`Job completed: ${job.id}`);
});

contentWorker.on("failed", (job, err) => {
  console.log(`Job failed: ${job?.id} - ${err.message}`);
});
