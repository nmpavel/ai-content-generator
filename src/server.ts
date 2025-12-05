import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { connectDB } from "./core/db";
import contentRoutes from "./routes/content.routes";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Log requests
app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = function (body) {
    console.log(`
=====================================
Request:${res.statusCode} ${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}
Response Body: ${JSON.stringify(body)}
=====================================
    `);
    return originalJson.call(this, body);
  };
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
