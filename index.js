import express from "express";
import "dotenv/config";
import connectDB from "./db/db.connection.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import userRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v2/message", messageRouter);
app.use(errorMiddleware);
app.use(cookieParser());
const corsOption = {
    origin: "*",
    credentials: true,
};
app.use(cors(corsOption));

app.get("/", (req, res) => res.send("Chat Application"));


connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`🌐✨ Server is up and running smoothly on port ${process.env.PORT}! 🚀🔥`);
        });
    })
    .catch((error) => {
        console.log(`❌ Database connection failed: ${error.message}`);
        process.exit(1);
    });