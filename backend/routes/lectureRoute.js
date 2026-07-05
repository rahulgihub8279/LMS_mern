import express from "express";
import upload from "../middleware/multer.js";

import {
  createLecture,
  editLecture,
  getCourseLecture,
  removeLecture,
} from "../controller/lectureController.js";
const router = express.Router();
import isAuth from "../middleware/isAuth.js";

router.post("/create-lecture/:courseId", isAuth, createLecture);
router.get("/get-course-lecture/:courseId", isAuth, getCourseLecture);
router.post(
  "/edit-lecture/:lectureId",
  isAuth,
  upload.single("vedioUrl"),
  editLecture,
);
router.delete("delete-lecture/:lectureId", isAuth, removeLecture);

export default router;
