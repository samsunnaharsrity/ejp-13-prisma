import { prisma } from "../../lib/prisma";

export const getAllUsers = async () => {
  return prisma.user.findMany({
    where: {
      isDeleted: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getUserById = async (id: string) => {
  return prisma.user.findFirst({
    where: {
      id,
      isDeleted: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      avatar: true,
      bio: true,
      createdAt: true,
    },
  });
};

export const updateUser = async (
  id: string,
  data: {
    name?: string;
    bio?: string;
    phone?: string;
    avatar?: string;
  }
) => {
  return prisma.user.update({
    where: { id },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      bio: true,
      phone: true,
      avatar: true,
    },
  });
};

export const softDeleteUser = async (id: string) => {
  return prisma.user.update({
    where: { id },
    data: {
      isDeleted: true,
    },
  });
};