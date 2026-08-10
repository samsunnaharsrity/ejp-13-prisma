import { prisma } from "../../lib/prisma";

export const getPlans = async () => {
  return prisma.subscriptionPlan.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      price: "asc",
    },
  });
};

export const getMySubscription = async (
  userId: string
) => {
  return prisma.subscription.findFirst({
    where: {
      userId,
      isDeleted: false,
      status: "ACTIVE",
    },
    include: {
      plan: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const createSubscription = async (
  userId: string,
  planId: string
) => {
  const plan = await prisma.subscriptionPlan.findUnique({
    where: {
      id: planId,
    },
  });

  if (!plan || !plan.isActive) {
    throw new Error("Subscription plan not found");
  }

  return prisma.subscription.create({
    data: {
      userId,
      planId,
      status: "ACTIVE",
      startDate: new Date(),
    },
    include: {
      plan: true,
    },
  });
};