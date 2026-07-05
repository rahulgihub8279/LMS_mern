import express from "express";
import isAuth from "../middleware/isAuth.js";
import upload from "../middleware/multer.js";
const router = express.Router();
import { getCurrentUser, updateProfile } from "../controller/userController.js";

router.get("/get-current-user", isAuth, getCurrentUser);
router.post("/profile", isAuth, upload.single("photoUrl"), updateProfile)


export default router;
