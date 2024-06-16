import { StatusCodes } from "http-status-codes";
import UserModel from "../models/user-model.js";
import jobModel from "../models/job-model.js";
import { promises as fs } from "fs";
import cloudinary from "cloudinary";

export const getCurrentUser = async (req, res) => {
  const user = await UserModel.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const userCount = await UserModel.countDocuments();
  const jobCount = await jobModel.countDocuments();
  res.status(StatusCodes.OK).json({ userCount, jobCount });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.userId,
    newUser,
  );

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "update user" });
};
