const asyncHandler = require("express-async-handler");   // parallel cheeeza chal skn 
const bcrypt = require("bcrypt"); // for password encryption 
const User = require("../model/userModel");
const jwt = require("jsonwebtoken")
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

// Login user with static token
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    // Static token generation (for example purpose)
    // const token = "static_token_for_user"; // Replace with actual logic for generating token

    // res.json({ message: "Login successful", token });

    // Generate JWT token (optional for authentication)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ message: "Login successful", token, user: { email: user.email, first_name: user.first_name } });
});

module.exports={registerUser,loginUser};