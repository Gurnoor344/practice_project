const mongoose = require("mongoose");
const newsletterSchema = mongoose.Schema({
    title:{
        type : String , 
        require : [ true , "please add title"],
    },
    author:{
        type : String , 
        require : [ true , "please add author"],
    },
    date:{
        type : String , 
        require : [ true , "please add date"],
    },
    imageUrl:{
        type : String , 
        require : [ true , "please add imageUrl"],
    },
    description:{
        type : String , 
        require : [ true , "please add description"],
    },



},
{
    timestamps : true ,
});
module.exports = mongoose.model("Newsletter" , newsletterSchema);