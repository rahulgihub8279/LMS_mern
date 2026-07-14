import courseModel from "../models/courseModel.js";
import reviewModel from "../models/reviewModel.js";

export const createReview = async (req, res) => {
  try {
    const { rating, comment, courseId } = req.body;
    const userId = req.userId;
    if (!rating || !comment) {
      return res.status(400).json({
        message: "Rating and comment are required",
      });
    }
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "course not found !" });
    }
    const alreadyReviewed = await reviewModel.findOne({
      course: courseId,
      user: userId,
    });
    if (alreadyReviewed) {
      return res.status(400).json({ message: "already reviewed" });
    }
    const review = await reviewModel.create({
      course: courseId,
      user: userId,
      rating,
      comment,
    });
    course.reviews.push(review._id);
    await course.save();
    return res.status(201).json(review);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({})
      .populate("user", "name photoUrl role")
      .sort({ createdAt: -1 });
    return res.status(200).json(reviews);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
