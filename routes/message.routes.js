import { Router } from "express";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";
import { sendMessage } from "../controllers/message.controllers.js";

const router = Router();

router.post("/send/:receiverId", isAuthenticatedUser, sendMessage);

export default router;