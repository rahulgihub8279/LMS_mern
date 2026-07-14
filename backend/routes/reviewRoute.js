import express from "express";
const router = express.Router();
import isAuth from "../middleware/isAuth.js";
import { createReview, getReviews } from "../controller/reviewController.js";

router.post("/create-review", isAuth, createReview);
router.get("/get-review", getReviews);

export default router;
