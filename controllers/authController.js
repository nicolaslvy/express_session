//llamando a los modulos 
const bcrypt = require('bcrypt')
const JWT = require("jsonwebtoken")
const path = require('path')
const fsPromises = require('fs').promises
require('dotenv').config()

const data = {
    users: require('../model/user.json'),
    setEmployees: function (data) { this.user = data }
}

const verification = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ 'message': 'username and password are required' })
    const foundUser = data.users.find(usuario => usuario.username === user)
    if (!foundUser) return res.sendStatus(401);
    const match = await bcrypt.compare(pwd, foundUser.password)

    if (match) {
        // creando el jsonwebtoken,firmando accestoken &&refreshtoken 
        const accessToken = JWT.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "300s" }
        )


        const refreshToken = JWT.sign(
            { "username": foundUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' })


        //guardando el Token en usuario actual

        const otherUsers = data.users.filter(person => person.username !== foundUser.username)
        const currentUser = {...foundUser, refreshToken}

        data.setEmployees([...otherUsers, currentUser]);

        //escribiendo el json que simula la base de datos
        let locationJson = path.join(__dirname, "..", "model", "user.json")
        await fsPromises.writeFile(locationJson, JSON.stringify(data.users))
        //enviando token 
        res.cookie('JWT',refreshToken, {httpOnly:true,sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000})
        res.json({accessToken})    
        res.json({ 'message': 'succesfully logged in' })
    } else {
        res.sendStatus(401)
    }

    res.sendStatus(200);


}

module.exports = { verification };