import { Router } from "express";
import { prisma } from "../lib/prisma";

const router = Router();

router.get("/dashboard", async (_req, res) => {
  try {
    const [
      totalUsers,
      totalArtists,
      totalArtworks,
      totalOrders,
      totalCategories,
    ] = await Promise.all([
      prisma.user.count({
        where: {
          isDeleted: false,
        },
      }),

      prisma.user.count({
        where: {
          role: "ARTIST",
          isDeleted: false,
        },
      }),

      prisma.artwork.count({
        where: {
          isDeleted: false,
        },
      }),

      prisma.order.count({
        where: {
          isDeleted: false,
        },
      }),

      prisma.category.count({
        where: {
          isDeleted: false,
        },
      }),
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalArtists,
        totalArtworks,
        totalOrders,
        totalCategories,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/users", async (_req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        isDeleted: false,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;