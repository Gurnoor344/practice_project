// const express = require("express");
// const mongoose = require("mongoose");
// const connectDb = require("./config/dbConnection");
// const errorHandler = require("./middleware/errorHandler");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");
// const hbs = require("hbs");
// const multer = require('multer');
// const File = require('./model/file'); // Import the File model

// dotenv.config();
// connectDb(); // Connect to the database

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Set up Handlebars as the view engine
// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'views'));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// // Configure Multer storage with unique filenames
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads'); // Make sure this directory exists
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, file.fieldname + '-' + uniqueSuffix);
//     }
// });
// const upload = multer({ storage: storage });

// // Home route to render the page
// app.get("/home", async (req, res) => {
//     // Fetch all uploaded files from MongoDB
//     const files = await File.find();
//     res.render("home", {
//         username: "Hiya",
//         users: [{ name: "John Doe", age: 30 }, { name: "Jane Smith", age: 25 }],
//         files: files // Pass files to the template
//     });
// });

// // Route to handle file upload and save metadata in MongoDB
// app.post('/profile', upload.single('avatar'), async (req, res) => {
//     try {
//         // Create a new file record in MongoDB
//         const fileData = new File({
//             originalName: req.file.originalname,
//             filename: req.file.filename,
//             path: req.file.path,
//             size: req.file.size,
//         });

//         await fileData.save(); // Save metadata to MongoDB
//         console.log("File metadata saved:", fileData);

//         return res.redirect("/home");
//     } catch (error) {
//         console.error("Error uploading file:", error);
//         res.status(500).send("Error uploading file.");
//     }
// });

// // Error handling middleware
// app.use(errorHandler);

// app.use("/api/newsletter",require("./routes/newsletterRoutes"));
// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });





const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors= require("cors");
const hbs = require("hbs");
const path = require("path");
const multer = require('multer');
//const { GridFsStorage } = require("multer-gridfs-storage");
// const upload = multer({ dest : 'uploads/'})
const mongoose = require("mongoose");
const doctorsDetails = require("./routes/doctorDetails");
const Profie= require("./model/profile")
const app = express();
app.use(express.static("public"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const users = [
    { name: "gurnoor", age: 20 },
    { name: "harjot", age: 19 },
    { name: "guntas", age: 20 },
];

const port = 7000 || 5000;
const dotenv = require("dotenv");
 dotenv.config();
 connectDb();
app.use(express.json());
app.use(cors());
app.get('/' , (req , res)=>{
    res.send("working");
})
app.set('view engine' , 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));
app.get("/home",(req , res)=>{
    res.render("home" , {
       username:" Harman Dhiman",
       posts : " time pass"
    })
})
app.get("/alluser", (req, res) => {
    res.render("alluser", {
        users: users, 
    });
});
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./uploads"); // Directory to save files
//     },
//     filename: (req, file, cb) => {
//         const uniqueSuffex = Date.now() + "-" + Math.round(Math.random()*1E9);
//         cb(null, file.filename +'-'+uniqueSuffex); 
//     },
// });

// Set up GridFsStorage for file storage in MongoDB
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
//   const upload = multer({ storage: storage })
 const upload = multer({storage : storage});
app.post("/profile", upload.single("avatar"), async function(req, res , next) {
    console.log(req.body);
    console.log(req.file);
    // console.log(req.file.path)
    let {title} = req.body;
    let {path} = req.file;
    let newProfie = new Profie({ title:title ,  image: path });
    await newProfie.save();
    res.render("profile", { image: path });
    
});
app.get("/profile",async(req,res)=>{
    
    let allblog=await Profie.find();
    console.log("chalgya oyee");
    
    res.render("profile",{profile : allblog});
}) 
// app.get("/profile", async (req, res) => {
//     let profile = await Profie.findOne();
//     console.log(profile)
    
//     if (profile) {
//         // console.log("Image URL:"+ profile.image);  // Log the image path
//         res.render("profile", { image: profile.image });
//     } else {
//         console.log("No profile found.");
//         res.render("profile", { image: null });
//     }
// });

//register route
app.use("/api/register" , require("./routes/userRoutes"));
app.use("/api/newsletter" , require("./routes/newsletterRoutes"));
app.use("/api/doctors", doctorsDetails);
app.listen(port , ()=>{
    console.log(`server running on http://localhost:${port}`);
})