import express from "express";
import { registerUser } from "../controllers/users.controllers.js";

const router = express.Router();

router.post("/register", registerUser);

export default router;