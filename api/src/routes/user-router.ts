import express from "express";
import { UsersController } from "../controllers/user-controllers";
import { authenticate } from "../middleware/auth-middleware";

const router = express.Router();

router.post("/login", UsersController.login);
router.post("/register/admin", UsersController.registerAdmin);
router.post("/register/member", UsersController.registerMember);
router.get("/current-user", authenticate, UsersController.getCurrentUser);

export default router;
