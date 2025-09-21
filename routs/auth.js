import express from "express";
import bcrypt from "bcrypt"
import User from "../models/user.js";

const Router=express.Router();

//sign up
Router.post("/register", async(req,res)=>{
    try {
        const{email,username,password}=req.body;
        
        const hashpassword = await bcrypt.hash(password, 10);
        
        //authentication
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "User already exists" });
        }

        const user = new User({email, username,password:hashpassword});
        await user.save().then(()=>
            res.status(200).json({message:"Sign Up successfull"})
        )
    } catch (error) {
        res.status(400).json({message:"User Already Exist"});
    }
});

// GET route for testing
Router.get("/register", (req, res) => {
    res.send("API is working! Use POST for registration.");
});

//sign in

Router.post("/signin", async(req,res)=>{
    try {
        const user = await User.findOne({ email : req.body.email });
        if(!user){
            res.status(200).json({message:"Please sign up first"});
        }

        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if(!isPasswordCorrect){
            res.status(200).json({message:"incorrect password"});
        }
        const {password, ...others} = user._doc;
        res.status(200).json({ others });

    } catch (error) {
        res.status(400).json({message:"User Already Exist"});
    }
});



export default Router;