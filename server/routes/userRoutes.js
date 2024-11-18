const express = require("express");
//  const { validateJwtToken } = require("../server.js");
const User = require("../model/userModel");
const { validateJwtToken } = require("../middleware/jwtMiddleware");

const myAccount = async(req, res)=>{
    const {email} = req.body;
    const user = await User.findOne({ email

     });
    if(user){
        res.send(user);
    }

}
const updateUser = async (req, res) => {
    const { email,firstname, lastname, age, bloodgroup,gender, phoneno, password } = req.body;
    try {
        const user = await user.findOneAndUpdate(
            { email },
            { firstname, lastname, age, bloodgroup, gender, phoneno, password },
            { new: true }
        );
        if (user) {
            res.send({ message: "User updated successfully", user });
        } else {
            res.status(404).send({ message: "User not found" });
        npm}
    } catch (error) {
        res.status(500).send({ message: "Error updating user details" });
    }
};




const router = express.Router();
const{
    registerUser,loginUser
    
}= require("../controllers/userControllers");


//route fo ruser registration
router.post("/register",registerUser);
//route for user login 
router.post("/login", loginUser);
router.get("/details" , validateJwtToken , myAccount);
// router.put("/detailsUpdate" , validateJwtToken);
module.exports = router;

