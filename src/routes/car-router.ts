import express from "express";
const router = express.Router();
import upload from "../middleware/upload";
const carController = require("../controllers/car-controllers");

router.get("/cars", carController.get);
router.get("/cars/:id", carController.getById);
router.post("/cars", upload.single("image"), carController.post);
router.delete("/cars/:id", carController.deleteById);
router.put("/cars/:id", carController.updateById);

module.exports = router;
