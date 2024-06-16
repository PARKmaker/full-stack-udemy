import { Router } from "express";
import { login, logout, register } from "../controllers/auth-controller.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middleware/validation-middleware.js";

const router = Router();

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/logout", logout);

export default router;
