import { prisma } from "../../lib/prisma";

export const createCategory = async (
  name: string,
  slug: string,
  description?: string
) => {
  return prisma.category.create({
    data: {
      name,
      slug,
      description,
    },
  });
};

export const getCategories = async () => {
  return prisma.category.findMany({
    where: {
      isDeleted: false,
    },
    include: {
      artworks: {
        where: {
          isDeleted: false,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
};

export const getCategoryById = async (
  id: string
) => {
  return prisma.category.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      artworks: {
        where: {
          isDeleted: false,
        },
        include: {
          artist: {
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

export const updateCategory = async (
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
  }
) => {
  const category = await prisma.category.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return prisma.category.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteCategory = async (
  id: string
) => {
  const category = await prisma.category.findFirst({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return prisma.category.update({
    where: {
      id,
    },
    data: {
      isDeleted: true,
    },
  });
};