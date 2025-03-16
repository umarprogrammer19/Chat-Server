import { Router } from "express";
import isAuthnticated from "../middlewares/auth.middleware.js";
import { sendMessage } from "../controllers/message.controllers.js";

const router = Router();

router.post("/send/:receiverId", isAuthnticated, sendMessage);

export default router;