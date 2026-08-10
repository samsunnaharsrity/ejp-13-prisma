import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
} from "../services/order/order.service";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { buyerId, artworkId } = req.body;

    const order = await createOrder({
      buyerId,
      artworkId,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/my-orders/:buyerId", async (req, res) => {
  try {
    const orders = await getMyOrders(
      req.params.buyerId
    );

    res.json({
      success: true,
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id/:buyerId", async (req, res) => {
  try {
    const order = await getOrderById(
      req.params.id,
      req.params.buyerId
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;