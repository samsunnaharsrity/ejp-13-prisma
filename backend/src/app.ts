import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "ArtHub API is running",
    data: null,
  });
});

app.use("/api/auth", authRoutes);


// app.use("/api/users", userRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/artworks", artworkRoutes);
// app.use("/api/artists", artistRoutes);
// app.use("/api/reviews", reviewRoutes);
// app.use("/api/wishlist", wishlistRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/subscriptions", subscriptionRoutes);
// app.use("/api/admin", adminRoutes);

export default app;