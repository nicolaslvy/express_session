const data = {
    users: require('../model/user.json'),
    setUser: function (data) {this.users = data}

}

const JWT = require('jsonwebtoken')
require('dotenv').config()

const handleRefresh = (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(401);// Unauthorized
    const refreshTokenUser = cookies.jwt;
    
    const foundUser = data.users.find(person => person.refreshToken === refreshTokenUser )
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    //evaluate JWT
    JWT.sign(
        refreshTokenUser,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded)=>{
            //falta validar token que nosea de diferente usauario   || foundUser !== decoded.username
            if(err) return res.sendStatus(403); //forbidden 
            const accessToken = JWT.sign(
                {"username": decoded.username},
                process.env.ACCES_TOKEN_SECRET,
                {expiresIn: '60s'}
            );
            res.json({accessToken})
            
        }
    )


}

module.exports = {handleRefresh}