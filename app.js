import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import serverless from "serverless-http";

import auth from "./routs/auth.js";
import list from "./routs/list.js";

dotenv.config();

const app = express();

// ---------- Middleware ----------
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

// ---------- MongoDB connection ----------
let isConnected = false;
async function connectToMongoDB() {
  if (!isConnected) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  }
}

// Ensure MongoDB is ready for each request
app.use(async (req, res, next) => {
  if (!isConnected) await connectToMongoDB();
  next();
});

// ---------- Routes ----------
app.get("/", (req, res) => {
  res.send("API is working!");
});

app.use("/api/v1", auth);
app.use("/api/v2", list);

// ---------- Export for Vercel ----------
export const handler = serverless(app);

// ---------- For local dev ----------
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`🚀 Server running on http://localhost:${port}`));
}
