import app from "./app";
import { prisma } from "./lib/prisma";

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
};

startServer();

export default app;