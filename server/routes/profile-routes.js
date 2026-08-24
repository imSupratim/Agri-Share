import express from "express";
import protect from "../middleware/auth-middleware.js";
import { getProfile, updateProfile } from "../controllers/pofile-controller.js";

const router = express.Router();

router.get("/", protect, getProfile);
router.patch("/", protect, updateProfile);

export default router;
