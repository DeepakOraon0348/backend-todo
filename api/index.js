dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import serverless from "serverless-http";
dotenv.config();
import auth from "../routs/auth.js";
import list from "../routs/list.js";

const app = express();

const corsConfig = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsConfig));
app.use(express.json());

let isConnected = false;

async function connectDB() {
    if (!isConnected) {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
    }
}

app.use("/api/v1", auth);
app.use("/api/v2", list);

const handler = serverless(app);

export default async function(req, res) {
    await connectDB();
    return handler(req, res);
}
