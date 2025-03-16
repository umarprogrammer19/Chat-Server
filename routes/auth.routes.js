import express from "express";
import { getMyProfile, loginUser, registerUser } from "../controllers/users.controllers.js";
import { isAuthenticatedUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/get-profile", isAuthenticatedUser, getMyProfile);

export default router;