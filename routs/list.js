import express from "express";
import User from "../models/user.js";
import List from "../models/list.js";
 
import list from "../routs/list.js";
const Router=express.Router();


//creation of task
Router.post("/addTask", async(req, res)=>{
    try {
        const {title, body, id}=req.body;
        const existingUser= await User.findById(id);
        if(existingUser){
            const list = new List({title, body, user : existingUser});
            await list.save().then(()=> res.status(200).json({ list }));
            existingUser.list.push(list);
            existingUser.save();
        }
    } catch (error) {
       console.log(error); 
    }
});

//updata operation
Router.put("/updateTask/:id", async(req, res)=>{
    try {
        const {title,body}=req.body;
        const list = await List.findByIdAndUpdate(req.params.id, {title,body});
        await list.save().then(()=>res.status(200).json({messase:"update successfully"}));
    } catch (error) {
       console.log(error); 
    }
});

//deleted task
Router.delete("/deleteTask/:id", async(req, res)=>{
    try {
        const { id }=req.body;
        const existingUser= await User.findByIdAndUpdate(
            id,
            {$pull:{list:req.params.id}});
        if(existingUser){
            await List.findByIdAndDelete(req.params.id)
            .then(()=>res.status(200).json({messase:"task deleted"}));
        }
    } catch (error) {
       console.log(error); 
    }
});

//get the data from the data base
Router.get("/getTask/:id", async (req, res)=>{
    const list = await List.find({user : req.params.id}).sort({ createdAt: -1 });
    if(list.length !== 0){
        res.status(200).json({ list : list });
    }else{
        res.status(200).json({"message":"No Task"});
    }
})


export default Router;