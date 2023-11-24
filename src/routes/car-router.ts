import express from "express";
import { upload } from "../middleware/upload";
import { CarsController } from "../controllers/car-controllers";
import { authenticate } from "../middleware/auth-middleware";

const router = express.Router();

router.get("/cars", CarsController.get);
router.get("/cars/:id", CarsController.getById);
router.post("/cars", authenticate, upload.single("image"), CarsController.post);
router.delete("/cars/:id", authenticate, CarsController.deleteById);
router.put("/cars/:id", authenticate, CarsController.updateById);

export default router;
