import express from "express";
import isAuth from "../middleware/isAuth.js";
import {
  createCourse,
  editCourse,
  getAllCourses,
  getCourseById,
  getCreatorCourse,
  getPublishedCourses,
  removeCourse,
  getCreatorById,
} from "../controller/courseController.js";
import upload from "../middleware/multer.js";
const router = express.Router();

router.post("/create", isAuth, createCourse);
router.get("/get-published", getPublishedCourses);
router.get("/all-courses", getAllCourses);
router.get("/get-creator", isAuth, getCreatorCourse);
router.get("/get-course/:courseId", isAuth, getCourseById);
router.post("/get-creator-by-Id", isAuth, getCreatorById);
router.delete("/remove/:courseId", isAuth, removeCourse);
router.post("/edit/:courseId", isAuth, upload.single("thumbnail"), editCourse);

export default router;
