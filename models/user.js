import mongoose from "mongoose";
import list from "./list.js";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    list:[{
        type:mongoose.Types.ObjectId,
        ref:"list"
    }]

})

export default mongoose.model("user",userSchema);