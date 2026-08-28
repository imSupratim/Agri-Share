import express from "express";
import {
  createEquipment,
  deleteEquipment,
  getAllEquipment,
  getEquipmentById,
  getMyEquipment,
  updateEquipment,
} from "../controllers/equipment-controller.js";
import protect from "../middleware/auth-middleware.js";

const router = express.Router();
router.get("/", getAllEquipment);
router.get("/mine",protect,  getMyEquipment);
router.get("/:id", getEquipmentById);
router.post("/", protect, createEquipment);
router.patch("/:id", protect, updateEquipment);
router.delete("/:id", protect, deleteEquipment);

export default router;
