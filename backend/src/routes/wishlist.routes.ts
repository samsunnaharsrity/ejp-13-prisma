import { Router } from "express";
import {
  addToWishlist,
  removeFromWishlist,
  getMyWishlist,
} from "../services/wishlist/wishlist.service";

const router = Router();

router.get("/:userId", async (req, res) => {
  try {
    const wishlist = await getMyWishlist(
      req.params.userId
    );

    res.json({
      success: true,
      data: wishlist,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, artworkId } = req.body;

    const wishlist = await addToWishlist(
      userId,
      artworkId
    );

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      data: wishlist,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { userId, artworkId } = req.body;

    await removeFromWishlist(
      userId,
      artworkId
    );

    res.json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;