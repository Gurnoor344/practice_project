const express = require('express')
const connectDb=require("./config/dbConnection")
const errorHandler=require('./middleware/errorHandler')
const cors=require("cors"); 

//env file config
const dotenv=require("dotenv");
dotenv. config();

connectDb();
const app=express();
const port =process.env.PORT || 3000; 
app.set('view engine','hbs');
var hbs=require('hbs');
hbs.registerPartials(__dirname+'/views/partials',function(err){});


app.use(express.json());
app.use(cors());

//routes below 
app.get('/',(req,res)=>{
    res.send("working");
});
app.get("/home",(req,res)=>{
    res.render("home",{
       username:"harleen",
       posts:"abcd"
    })
})
app.get("/alluser",(req,res)=>{
    const users=[
        {username:"harleen",age:20},
        {username:"ishi",age:30},
        {username:"harleen2",age:20}

    ];
    res.render("alluser",{
       users:users
    });
});
//error handling middleware 
app.use(errorHandler)

//
app.use("/api/register",require("./routes/userRoutes"));

app.use("/api/details",require("./routes/doctorDetails"));
//app config start 
app.listen(port,()=>{
    console.log(`server running on port http://localhost:${port}`);
})