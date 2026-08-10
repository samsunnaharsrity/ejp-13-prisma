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
    orderBy: {
      name: "asc",
    },
  });
};

export const getCategoryById = async (id: string) => {
  return prisma.category.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      products: {
        where: {
          isDeleted: false,
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
    image?: string;
  }
) => {
  return prisma.category.update({
    where: { id },
    data,
  });
};

export const deleteCategory = async (id: string) => {
  return prisma.category.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });
};