import courseModel from "../models/courseModel.js";
import uploadOnCloudinary from "../config/cloudinary.js";

export const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: "title or category required" });
    }
    const course = await courseModel.create({
      title,
      category,
      creator: req.userId,
    });
    return res.status(201).json(course);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await courseModel.find({ isPublished: true });
    if (!courses) {
      return res.status(400).json({ message: "courses not found" });
    }
    return res.status(200).json(courses);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getCreatorCourse = async (req, res) => {
  try {
    const courses = await courseModel.find({ creator: req.userId });
    if (!courses) {
      return res.status(400).json({ message: "courses not found" });
    }
    return res.status(200).json(courses);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "courses not found" });
    }
    return res.status(200).json(course);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getAllCourses = async (req, res) => {
  try { 
    const course = await courseModel.find();
    if (!course) {
      return res.status(400).json({ message: "courses not found" });
    }
    return res.status(200).json(course);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "courses not found" });
    }
    await courseModel.findByIdAndDelete(courseId, { new: true });
    return res.status(200).json({ message: "course removed" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const {
      title,
      category,
      price,
      isPublished,
      subTitle,
      description,
      level,
    } = req.body;
    let thumbnail;
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }
    let course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "courses not found" });
    }
    const updateData = {
      title,
      category,
      price,
      isPublished,
      subTitle,
      description,
      level,
      thumbnail,
    };
    course = await courseModel.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    return res.status(201).json(course);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
