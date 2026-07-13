import razorpay from "razorpay";
import courseModel from "../models/courseModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const razorpayOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(400).json({ message: "course not found !" });
    }
    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: `${courseId.toString()}`,
    };
    const order = await razorpayInstance.orders.create(options);
    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { userId, courseId, razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    
    if (orderInfo.status === "paid") {
      const user = await userModel.findById(userId);
      const course = await courseModel.findById(courseId).populate("lectures");
      
      if (!user || !course) {
        return res.status(404).json({
          message: "user or course not found",
        });
      }
      if (!user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
        await user.save();
      }
      if (!course.enrolledStudents.includes(userId)) {
        course.enrolledStudents.push(userId);
        await course.save();
      }
      return res.status(200).json({ message: "payment verified" });
    } else {
      return res.status(400).json({ message: "payment failed !" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
