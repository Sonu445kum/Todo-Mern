const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId , ref :"User"
    },
    title :String,
    completed :{
        type :Boolean ,
        default :false
    },
},{timestamps:true});

// export todoSchema here
module.exports = mongoose.model("todo",todoSchema);