import { prisma } from "../../lib/prisma";

export const createReview = async (
  userId: string,
  artworkId: string,
  rating: number,
  comment: string
) => {
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
    },
  });
};