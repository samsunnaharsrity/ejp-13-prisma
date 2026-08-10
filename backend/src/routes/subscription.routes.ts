import { Router } from "express";
import {
  getPlans,
  getMySubscription,
  createSubscription,
} from "../services/subscription/subscription.service";

const router = Router();

router.get("/plans", async (_req, res) => {
  try {
    const plans = await getPlans();

    res.json({
      success: true,
      data: plans,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:userId", async (req, res) => {
  try {
    const subscription = await getMySubscription(
      req.params.userId
    );

    res.json({
      success: true,
      data: subscription,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { userId, planId } = req.body;

    const subscription = await createSubscription(
      userId,
      planId
    );

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;