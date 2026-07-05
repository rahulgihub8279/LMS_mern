import uploadOnCloudinary from "../config/cloudinary.js";
import userModel from "../models/userModel.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { desc, name } = req.body;
    let photoUrl; 
    
    if (req.file) {
      photoUrl = await uploadOnCloudinary(req.file.path);
    }
    const user = await userModel.findByIdAndUpdate(userId, {
      name,
      description: desc,
      photoUrl,
    });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
