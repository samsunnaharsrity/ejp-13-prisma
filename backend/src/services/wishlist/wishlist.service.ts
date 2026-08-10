import { prisma } from "../../lib/prisma";

// Add to wishlist
export const addToWishlist = async (
  userId: string,
  artworkId: string
) => {
  const artwork = await prisma.artwork.findFirst({
    where: {
      id: artworkId,
      isDeleted: false,
      status: "APPROVED",
    },
  });

  if (!artwork) {
    throw new Error("Artwork not found");
  }

  const existing = await prisma.wishlist.findUnique({
    where: {
      userId_artworkId: {
        userId,
        artworkId,
      },
    },
  });

  if (existing) {
    throw new Error("Artwork already in wishlist");
  }

  return prisma.wishlist.create({
    data: {
      userId,
      artworkId,
    },
    include: {
      artwork: {
        include: {
          artist: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          category: true,
        },
      },
    },
  });
};

// Get my wishlist
export const getMyWishlist = async (
  userId: string
) => {
  return prisma.wishlist.findMany({
    where: {
      userId,
    },
    include: {
      artwork: {
        include: {
          artist: {
            select: {
              id: true,
              name: true,
              avatar: true,
              artistProfile: true,
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

// Remove from wishlist
export const removeFromWishlist = async (
  userId: string,
  artworkId: string
) => {
  const wishlist = await prisma.wishlist.findUnique({
    where: {
      userId_artworkId: {
        userId,
        artworkId,
      },
    },
  });

  if (!wishlist) {
    throw new Error("Wishlist item not found");
  }

  return prisma.wishlist.delete({
    where: {
      userId_artworkId: {
        userId,
        artworkId,
      },
    },
  });
};