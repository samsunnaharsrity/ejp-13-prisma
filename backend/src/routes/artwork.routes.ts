import { Router } from "express";
import {
  createArtwork,
  getArtworks,
  getArtworkById,
  getArtistArtworks,
  updateArtwork,
  deleteArtwork,
} from "../services/artwork/artwork.service";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const artworks = await getArtworks();

    res.status(200).json({
      success: true,
      data: artworks,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const artwork = await getArtworkById(req.params.id);

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found",
      });
    }

    res.status(200).json({
      success: true,
      data: artwork,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/artist/:artistId", async (req, res) => {
  try {
    const artworks = await getArtistArtworks(
      req.params.artistId
    );

    res.status(200).json({
      success: true,
      data: artworks,
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
    const {
      artistId,
      title,
      slug,
      description,
      price,
      image,
      images,
      tags,
      categoryId,
    } = req.body;

    if (
      !artistId ||
      !title ||
      !slug ||
      !description ||
      price === undefined ||
      !image ||
      !categoryId
    ) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const artwork = await createArtwork(artistId, {
      title,
      slug,
      description,
      price: Number(price),
      image,
      images,
      tags,
      categoryId,
    });

    res.status(201).json({
      success: true,
      message: "Artwork created successfully",
      data: artwork,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { artistId, ...data } = req.body;

    if (!artistId) {
      return res.status(400).json({
        success: false,
        message: "artistId is required",
      });
    }

    const artwork = await updateArtwork(
      req.params.id,
      artistId,
      data
    );

    res.status(200).json({
      success: true,
      message: "Artwork updated successfully",
      data: artwork,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { artistId } = req.body;

    if (!artistId) {
      return res.status(400).json({
        success: false,
        message: "artistId is required",
      });
    }

    const artwork = await deleteArtwork(
      req.params.id,
      artistId
    );

    res.status(200).json({
      success: true,
      message: "Artwork deleted successfully",
      data: artwork,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;