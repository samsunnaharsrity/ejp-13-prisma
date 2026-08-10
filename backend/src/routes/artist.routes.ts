import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const artists = await prisma.user.findMany({
      where: {
        role: "ARTIST",
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        artistProfile: true,
        _count: {
          select: {
            artworks: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: artists,
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
    const artist = await prisma.user.findFirst({
      where: {
        id: req.params.id,
        role: "ARTIST",
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        artistProfile: true,
        artworks: {
          where: {
            isDeleted: false,
          },
          include: {
            category: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: "Artist not found",
      });
    }

    res.json({
      success: true,
      data: artist,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;