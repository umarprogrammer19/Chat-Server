import express from "express";
import { Server } from "socket.io";
import https from "https";

const app = express();

const server = https.createServer(app);

const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

export { io, app, server };