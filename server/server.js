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
var hbs = require('hbs');
hbs.registerPartials(__dirname+'./views/partials',function (err) {});

//env file config [how it will work]
const dotenv = require("dotenv");
dotenv.config();

 connectDb();
const app=express();
const port =process.env.port || 5000; 

app.set('view engine','hbs');
app.use(express.json());  
app.use(cors());


//user registration 
app.use("/api/register", require("./routes/userRoutes"));

// //error handling middleware 


// //routes below 
app.get('/',(req,res)=>{
    res.send("working");
});

app.get('/home',(req,res)=>{
   // let user = User.findOne({id:})
    res.render("home",{
        username :"gurnoor"
    })
});

app.get('/alluser',(req,res)=>{
    // let user = User.findOne({id:})
     const user = [
         {Username :"gurnoor",Age : 16},
         {Username :"sdfghjk",Age : 45}
     ];
     res.render("alluser",{
        user:user
     });
 });


 
app.use(errorHandler)


// //app config start 
app.listen(port,()=>{
    console.log(`server running on port http://localhost:${port}`);

})