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
    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide email and password");
    }
    
    const user = await User.findOne({ email });
    
    if (user && (await bcrypt.compare(password, user.password))) {
        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.PRIVATE_KEY,
            { expiresIn: "1h" }  // Token expiration time
        );

        console.log(token)

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
            },
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

module.exports = { registerUser, loginUser };