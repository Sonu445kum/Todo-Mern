const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

// middlewre
export const protect = async (req ,res , next)=>{
    try {
        let token;
        if(req.headers.authorization?.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];

            // decode
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.id).select("-password");
            // call the next functions
            next();
        }
    } catch (error) {
        res.status(401);
        console.log("Not Authorized:")
    }
}