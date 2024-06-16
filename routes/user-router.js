import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/user-controller.js";
import { validateUpdateUserInput } from "../middleware/validation-middleware.js";
import {
  authorizePermissions,
  checkForTestUser,
} from "../middleware/auth-middleware.js";
import upload from "../middleware/multer-middleware.js";

const router = Router();

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", [
  authorizePermissions("admin"),
  getApplicationStats,
]);

router.patch(
  "/update-user",
  checkForTestUser,
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser,
);

export default router;
