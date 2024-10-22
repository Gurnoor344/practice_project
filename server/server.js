//WHAT TO DO 
/*
dr  appointment ---- 
id:, name:string
dr specialization:String
//phone no hospital no , address string
//available slot:20  */

//framework configuration 
const express = require('express')
const connectDb=require("./config/dbConnection")
const errorHandler=require('./middleware/errorHandler')
const cors=require("cors"); 

//env file config [how it will work]
const dotenv = require("dotenv");
dotenv.config();

 connectDb();
const app=express();
const port =process.env.port || 5000; 


app.use(express.json());  
app.use(cors());
// //error handling middleware 


// //routes below 
app.get('/',(req,res)=>{
    res.send("working");
});

app.use(errorHandler)


// //app config start 
app.listen(port,()=>{
    console.log(`server running on port http://localhost:${port}`);

})