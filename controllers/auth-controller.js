import UserModel from "../models/user-model.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, hashPassword } from "../utils/password-utils.js";
import { UnauthenticatedError } from "../errors/custom-errors.js";
import { createJWT } from "../utils/token-utils.js";

export const register = async (req, res) => {
  const isFirstAccount = (await UserModel.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  req.body.password = await hashPassword(req.body.password);

  const user = await UserModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ mgs: "user created" });
};

export const login = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "user logged in" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
