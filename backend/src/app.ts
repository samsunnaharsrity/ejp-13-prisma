import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import artworkRoutes from "./routes/artwork.routes";
import artistRoutes from "./routes/artist.routes";
import reviewRoutes from "./routes/review.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import orderRoutes from "./routes/order.routes";
import subscriptionRoutes from "./routes/subscription.routes";
import adminRoutes from "./routes/admin.routes";

dotenv.config();

const app = express();

// MIDDLEWARE

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HEALTH CHECK

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "ArtHub API is running",
    data: null,
  });
});

// ROUTES

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/artworks", artworkRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/admin", adminRoutes);

// 404 HANDLER

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ERROR HANDLER

app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);

    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
);

export default app;