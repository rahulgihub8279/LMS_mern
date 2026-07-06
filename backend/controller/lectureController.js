import lecture from "../models/lectureModel.js";
import lectureModel from "../models/lectureModel.js";
import courseModel from "../models/courseModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";

export const createLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { lectureTitle } = req.body;
    if (!lectureTitle || !courseId) {
      return res.status(400).json({ message: "lecture title required" });
    }
    const lecture = await lectureModel.create({ lectureTitle });
    const course = await courseModel.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
    }
    await course.populate("lectures");
    await course.save();
    return res.status(201).json({ lecture, course });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "course not found" });
    }
    await course.populate("lectures");
    return res.status(200).json({ course });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { lectureTitle, isPreviewFree } = req.body;
    const lecture = await lectureModel.findById(lectureId);
    if (!lecture) {
      return res.status(400).json({ message: "lecture not found" });
    }
    let vedioUrl;
    if (req.file) {
      vedioUrl = await uploadOnCloudinary(req.file.path);
      lecture.vedioUrl = vedioUrl;
    }
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }
    if (isPreviewFree) {
      lecture.isPreviewFree = isPreviewFree;
    }
    await lecture.save();
    return res.status(200).json(lecture);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await lectureModel.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(400).json({ message: "lecture not found" });
    }
    await courseModel.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } },
    );
    return res.status(200).json({ message: "lecture deleted" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
