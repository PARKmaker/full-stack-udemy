import "express-async-errors";
import * as dotenv from "dotenv";

dotenv.config();

import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

const app = express();

// routers
import jobRouter from "./routes/job-router.js";
import authRouter from "./routes/auth-router.js";

// middleware
import errorHandlerMiddleware from "./middleware/error-handler-middleware.js";
import { authenticateUser } from "./middleware/auth-middleware.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user-router.js";

// public
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./public")));
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
