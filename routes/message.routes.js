import { Router } from "express";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";
import { getMessages, sendMessage } from "../controllers/message.controllers.js";

const router = Router();

router.post("/send/:receiverId", isAuthenticatedUser, sendMessage);
router.get("/get-message/:participantId", isAuthenticatedUser, getMessages);

export default router;