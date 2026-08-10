import { prisma } from "../../lib/prisma";

interface CreateOrderInput {
  buyerId: string;
  artworkId: string;
}

export const createOrder = async (
  input: CreateOrderInput
) => {
  return prisma.$transaction(async (tx) => {
    const artwork = await tx.artwork.findFirst({
      where: {
        id: input.artworkId,
        isDeleted: false,
        status: "APPROVED",
      },
    });

    if (!artwork) {
      throw new Error("Artwork is not available");
    }

    const platformFee =
      Number(artwork.price) * 0.05;

    const totalAmount =
      Number(artwork.price) + platformFee;

    const order = await tx.order.create({
      data: {
        userId: input.buyerId,
        totalAmount,
        status: "PENDING",
        paymentStatus: "PENDING",

        items: {
          create: {
            artworkId: artwork.id,
            price: artwork.price,
            quantity: 1,
          },
        },
      },

      include: {
        items: {
          include: {
            artwork: true,
          },
        },
      },
    });

    return order;
  });
};


export const getMyOrders = async (
  buyerId: string
) => {
  return prisma.order.findMany({
    where: {
      userId: buyerId,
      isDeleted: false,
    },

    include: {
      items: {
        include: {
          artwork: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
};


export const getOrderById = async (
  id: string,
  buyerId: string
) => {
  return prisma.order.findFirst({
    where: {
      id,
      userId: buyerId,
      isDeleted: false,
    },

    include: {
      items: {
        include: {
          artwork: true,
        },
      },
    },
  });
};