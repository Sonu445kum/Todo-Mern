// how to generate token
const jwt = require("jsonwebtoken");

// const generateToken = (id)=>{
//     return jwt.sign({id},process.env.JWT_SECRET ,{
//         expiresIn:"30d"
//     })
// };

// module.exports = generateToken;

export const generateAccessToken = (id)=>{
    jwt.sign({id},process.env.JWT_SECRET, {expiresIn:"15"});
}

export const generateRefreshToekn = (id)=>{
    jwt.sign({id},process.env.REFRESH_SECRET,{expiresIn:"7d"});
}