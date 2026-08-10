import { prisma } from "../../lib/prisma";

export const addToWishlist = async (
  userId: string,
  artworkId: string
) => {
  return prisma.wishlist.upsert({
    where: {
      userId_artworkId: {
        userId,
        artworkId,
      },
    },
    update: {
      isDeleted: false,
    },
    create: {
      userId,
      artworkId,
    },
  });
};

export const getWishlist = async (
  userId: string
) => {
  return prisma.wishlist.findMany({
    where: {
      userId,
      isDeleted: false,
    },
    include: {
      artwork: {
        include: {
          artist: {
            select: {
              id: true,
              name: true,
            },
          },
          category: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const removeFromWishlist = async (
  userId: string,
  artworkId: string
) => {
  return prisma.wishlist.updateMany({
    where: {
      userId,
      artworkId,
      isDeleted: false,
    },
    data: {
      isDeleted: true,
    },
  });
};