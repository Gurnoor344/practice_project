const express = require ("express");
const router = express.Router();
    
const{
    registerUser,
    loginUser
}= require("../controllers/userControllers");

//route fo ruser registration
//router.post("/register",registerUser);

//route for user login 
//router.post("/login",loginUser);


module.exports = router;
