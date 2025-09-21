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
    orgini:"*",
    Credential:true,
    METHODS:["GET","POST","PUT","DELETE"],
}
app.use(cors())
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log(`mongodb connected`);
}).catch((err)=>{
    console.log(err);
    
})

app.use("/api/v1", auth);
app.use("/api/v2", list);


// app.get('/',(req,res)=>{
//     res.send(`Hellow sir how are you`);
// })

// app.get("*", (req, res)=>{
//     app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
//     res.sendFile(path.resolve(__dirname, "frontend","dist","index.html"));
// });


app.use(express.static(path.join(__dirname, "frontend", "dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
);

app.listen(port,()=>{
    console.log(`server is runing on ${port}`);
})