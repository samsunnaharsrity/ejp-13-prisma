import { prisma } from "../../lib/prisma";

export const createArtwork = async (
  artistId: string,
  data: {
    title: string;
    slug: string;
    description: string;
    price: number;
    image: string;
    images?: string[];
    tags?: string[];
    categoryId: string;
  }
) => {
  return prisma.artwork.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      price: data.price,
      image: data.image,
      images: data.images || [],
      tags: data.tags || [],
      categoryId: data.categoryId,
      artistId,
    },
    include: {
      artist: {
        select: {
          id: true,
          name: true,
          artistProfile: true,
        },
      },
      category: true,
    },
  });
};

export const getArtworks = async () => {
  return prisma.artwork.findMany({
    where: {
      isDeleted: false,
      status: "APPROVED",
    },
    include: {
      artist: {
        select: {
          id: true,
          name: true,
          artistProfile: true,
        },
      },
      category: true,
      _count: {
        select: {
          reviews: true,
          wishlist: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getArtworkById = async (id: string) => {
  return prisma.artwork.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      artist: {
        select: {
          id: true,
          name: true,
          artistProfile: true,
        },
      },
      category: true,
      reviews: {
        where: {
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
      },
    },
  });
};

export const getArtistArtworks = async (
  artistId: string
) => {
  return prisma.artwork.findMany({
    where: {
      artistId,
      isDeleted: false,
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const updateArtwork = async (
  id: string,
  artistId: string,
  data: any
) => {
  const artwork = await prisma.artwork.findFirst({
    where: {
      id,
      artistId,
      isDeleted: false,
    },
  });

  if (!artwork) {
    throw new Error("Artwork not found");
  }

  return prisma.artwork.update({
    where: { id },
    data,
  });
};

export const deleteArtwork = async (
  id: string,
  artistId: string
) => {
  const artwork = await prisma.artwork.findFirst({
    where: {
      id,
      artistId,
      isDeleted: false,
    },
  });

  if (!artwork) {
    throw new Error("Artwork not found");
  }

  return prisma.artwork.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });
};