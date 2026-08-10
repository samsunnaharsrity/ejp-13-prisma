import { Router } from "express";
import {
  createReview,
  getArtworkReviews,
  updateReview,
  deleteReview,
} from "../services/review/review.service";

const router = Router();

// Get reviews for an artwork
router.get("/artwork/:artworkId", async (req, res) => {
  try {
    const reviews = await getArtworkReviews(req.params.artworkId);

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Create review
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      artworkId,
      rating,
      comment,
    } = req.body;

    if (!userId || !artworkId || rating === undefined) {
      return res.status(400).json({
        success: false,
        message: "userId, artworkId and rating are required",
      });
    }

    const review = await createReview(
      userId,
      artworkId,
      Number(rating),
      comment
    );

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Update review
router.patch("/:id", async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const review = await updateReview(
      req.params.id,
      userId,
      {
        ...(rating !== undefined && {
          rating: Number(rating),
        }),
        ...(comment !== undefined && {
          comment,
        }),
      }
    );

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete review
router.delete("/:id", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    const review = await deleteReview(
      req.params.id,
      userId
    );

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: review,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;