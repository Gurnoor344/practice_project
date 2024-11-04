const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema(
    {
        name:{
            type: String,
            require: [true, "please add your name"],
        },
        email:{
            type: String,
            require:[true,"please add your email"],
        },
        speciality:{
            type: String,
            require: [true, "please add your speaciality"],
        },
        phoneno:{
            type: String,
            require: [true, "please add your phoneno"],
        },
        experience:{
            type: String,
            require: [true, "please add your experience"],
        },
        address:{
            type:String,
            require:[true,"please add your address"]
        },
    },
    {
        timestamps: true,
}
);

module.exports = mongoose.model("doctor",doctorSchema);