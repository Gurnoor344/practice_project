const asyncHandler = require("express-async-handler");   // parallel cheeeza chal skn 
const bcrypt = require("bcrypt"); // for password encryption 
const User = require("../model/userModel");
require("dotenv").config();

//@route post/api/user/register
//@access public 

const registerUser = asyncHandler(async (req,res)=>{
    const {email,firstname,lastname,age,bloodgroup,gender,phoneno,password}= req.body;

    //check if all are provided 
    if(!email|| !firstname || !lastname || !age || !bloodgroup || !gender || !phoneno || !password){
        res.status(400);
        throw new Error("Please provide all fields");

    //chcek if user already exits 
    const userExists = await User.findOne({email});
    if(userExists){
        return res.status(400).json({message:"User alraedy exits "});
    }
    }
    //Hash the password
    const salt =  await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //create the  user 
    const user = await User.create({
        email,
        firstname,
        lastname,
        age,
        bloodgroup,
        gender,
        phoneno,
        password:hashedPassword,
    });

  
    res.status(201).json({message :"User registered successfully",user});

});
