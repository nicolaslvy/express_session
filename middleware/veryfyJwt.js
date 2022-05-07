
const JWT = require('jsonwebtoken')
require('dotenv').config()

const veryfyJwt = (req,res,next) => {

    const authHeader = req.headers['authorization'];
    
    if(!authHeader) return res.sendStatus(401)

    console.log(authHeader)
    const token = authHeader.split(' ')[1]


    JWT.verify(token,
         `${process.env.ACCESS_TOKEN_SECRET}`,
        (err,decoded)=>{
            if (err) return res.sendStatus(403);
            req.user = decoded.username;
            next();
        } )


}
module.exports = veryfyJwt