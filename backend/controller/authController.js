import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import genToken from "../config/token.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let existuser = await userModel.findOne({ email });

    if (existuser) {
      return res.status(400).json({ message: "user already exist" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "invalid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "password must have 8 chars" });
    }
    let hashpass = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashpass,
      role,
    });
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "incorrect password" });
    }
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({ user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "logout successful" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      user = await userModel.create({
        name,
        email,
        role,
      });
    }
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
