import express from "express";
import "dotenv/config";
import connectDB from "./db/db.connection.js";
const app = express();

// Parse JSON
app.use(express.json());

app.get("/", (req, res) => res.send("Chat Application"));

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`🌐✨ Server is up and running smoothly on port ${process.env.PORT}! 🚀🔥`);
        })
    })
    .catch((error) => {
        console.log(error.message);
    })