import express from "express";
import {
  googleAuth,
  login,
  logout,
  signup,
} from "../controller/authController.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/googleauth", googleAuth);

export default router;
