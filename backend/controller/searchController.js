import courseModel from "../models/courseModel.js";

export const searchWithAi = async (req, res) => {
  try {
    const { input } = req.body;
    if (!input) {
      return res.status(400).json({ message: "serrch query is required" });
    }
    const course = await courseModel.find({
      isPublished: true,
      $or: [
        { title: { $regex: input, $options: "i" } },
        { subTitle: { $regex: input, $options: "i" } },
        { description: { $regex: input, $options: "i" } },
        { category: { $regex: input, $options: "i" } },
        { level: { $regex: input, $options: "i" } },
      ],
    });
    return res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
