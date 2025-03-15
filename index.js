import express from "express";
import "dotenv/config";
const app = express();

app.get("/", (req, res) => res.send("Chat Application"));

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on the port ${process.env.PORT || 5000}`);
})