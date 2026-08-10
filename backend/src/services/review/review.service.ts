import { prisma } from "../../lib/prisma";

// Create Review
export const createReview = async (
  userId: string,
  artworkId: string,
  rating: number,
  comment?: string
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

  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  return prisma.review.create({
    data: {
      userId,
      artworkId,
      rating,
      comment,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
};

// Get Artwork Reviews
export const getArtworkReviews = async (
  artworkId: string
) => {
  return prisma.review.findMany({
    where: {
      artworkId,
      isDeleted: false,
      status: "ACTIVE",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Update Review
export const updateReview = async (
  id: string,
  userId: string,
  data: {
    rating?: number;
    comment?: string;
  }
) => {
  const review = await prisma.review.findFirst({
    where: {
      id,
      userId,
      isDeleted: false,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  if (
    data.rating !== undefined &&
    (data.rating < 1 || data.rating > 5)
  ) {
    throw new Error("Rating must be between 1 and 5");
  }

  return prisma.review.update({
    where: {
      id,
    },
    data: {
      ...(data.rating !== undefined && {
        rating: data.rating,
      }),
      ...(data.comment !== undefined && {
        comment: data.comment,
      }),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
};

// Delete Review
export const deleteReview = async (
  id: string,
  userId: string
) => {
  const review = await prisma.review.findFirst({
    where: {
      id,
      userId,
      isDeleted: false,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  return prisma.review.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
      status: "HIDDEN",
    },
  });
};