const data = {
    users: require('../model/user.json'),
    setUser: function (data) { this.users = data }

}

const JWT = require('jsonwebtoken')
require('dotenv').config()

const handleRefresh = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);// Unauthorized
    const refreshTokenUser = cookies.jwt;

    const foundUser = data.users.find(person => person.refreshToken === refreshTokenUser)
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    //evaluate JWT
    JWT.verify(
        refreshTokenUser,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            //falta validar token que nosea de diferente usauario   
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403); //forbidden 
            //geting roles in array
            let roles = Object.values(foundUser.roles)
            const accessToken = JWT.sign(
                {
                    "userInfo": {
                        "username": decoded.username,
                        "roles": roles

                    }
                },
                process.env.ACCES_TOKEN_SECRET,
                { expiresIn: '60s' }
            );
            res.json({ accessToken })

        }
    )


}

module.exports = { handleRefresh }