import { Queue } from "bullmq";
import { redisConnection } from "../core/redis";

export const contentQueue = new Queue("content-generation", {
  connection: redisConnection,
});

