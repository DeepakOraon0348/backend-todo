import express, { Router } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import auth from "./routs/auth.js";
import list from "./routs/list.js";
import path from "path";
import { fileURLToPath } from "url";
import { METHODS } from "http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;
const app=express();


const corsConfig = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsConfig));
app.use(express.json());


// mongoose.connect(process.env.MONGO_URI)
// .then(()=>{
//     console.log(`mongodb connected`);
// }).catch((err)=>{
//     console.log(err);
    
// })

let isConnected=false;
async function connectToMongoDB()  {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        isConnected=true;
        console.log("Connected to MongoDB");
    }catch(err){
        console.error("Error connecting to MongoDB", err);
        
    }
}
 
//add middleware to check connection
app.use((req, res, next)=>{
    if(!isConnected){
        connectToMongoDB
    }
    next();
})

app.use("/api/v1", auth);
app.use("/api/v2", list);

// Remove static file serving for Vercel

app.get("/", (req, res)=>{
    res.send("API is working!");
})
// For local development
// app.get("/api/test", (req, res) => {
//     res.send("API is working!");
// });

// app.listen(port, () => {
//     console.log(`server is running on ${port}`);
// });

module.exports = app;