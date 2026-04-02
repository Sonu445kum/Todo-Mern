const mongoose = require("mongoose");

const dbConnection  = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDb is Connect Successfully...!!!")
    } catch (error) {
        console.log("Error in Db:",error);
        process.exit(1);
    }
}

// export
module.exports = dbConnection;