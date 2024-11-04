const express=require("express");
const router=express.Router();
const{
    docDetails,getDoctors
}=require("../controllers/doctorDetailsController");

//route for registration
router.post("/details",docDetails);
//route for user login 
router.get("/details",getDoctors);

module.exports=router;