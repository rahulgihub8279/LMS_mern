import express from "express";
import { searchWithAi } from "../controller/searchController.js";
import isAuth from "../middleware/isAuth.js";
const router = express.Router();

router.post("/search", isAuth, searchWithAi);

export default router;
