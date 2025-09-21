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
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log('MongoDB connected!');
    }
}


app.use("/api/v1", auth);
app.use("/api/v2", list);

// Test route for deployment verification
app.get("/api/test", (req, res) => {
    res.send("API is working!");
});

const handler = serverless(app);

export default async function(req, res) {
    console.log('API handler invoked');
    await connectDB();
    console.log('DB connection done, handling request...');
    return handler(req, res);
}
