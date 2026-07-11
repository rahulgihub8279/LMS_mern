import express from "express";
import isAuth from "../middleware/isAuth.js";
import { razorpayOrder, verifyPayment } from "../controller/orderController.js";
const router = express.Router();

router.post("/razorpay-order", isAuth, razorpayOrder);
router.post("/verify-payment", isAuth, verifyPayment);

export default router;
