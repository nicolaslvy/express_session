
const JWT = require('jsonwebtoken')
require('dotenv').config()

const veryfyJwt = (req,res,next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization;
    
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    console.log(authHeader)
    const token = authHeader.split(' ')[1]


    JWT.verify(token,
         `${process.env.ACCESS_TOKEN_SECRET}`,
        (err,decoded)=>{
            if (err) return res.sendStatus(403);
            req.user = decoded.userInfo.username
            req.roles = decoded.userInfo.roles
            next();
        } )


}
module.exports = veryfyJwt