import mongoose from "mongoose";
import user from "./user.js";

const listSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    user:[{
        type:mongoose.Types.ObjectId,
        ref:"list"
    }]
})

export default mongoose.model("list",listSchema);