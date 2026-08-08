import express from "express";
import cors from "cors";

import { env } from "./config/env";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

import {
  notFound,
  errorHandler,
} from "./middleware/error.middleware";

const app = express();

// CORS
app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SCIC EJP-13 API is running",
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;