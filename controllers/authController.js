//llamando a los modulos 
const bcrypt = require('bcrypt')
const JWT = require("jsonwebtoken")
const path = require('path')
const fsPromises = require('fs').promises
require('dotenv').config()

const data = {
    users: require('../model/user.json'),
    setEmployees: function (data) { this.users = data }
}

const verification = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) return res.status(400).json({ 'message': 'username and password are required' })
    const foundUser = data.users.find(usuario => usuario.username === user)
    if (!foundUser) return res.sendStatus(401);
    const match = await bcrypt.compare(pwd, foundUser.password)

    if (match) {
        //obteniendo los roles del ususario almacenados 
        let roles = Object.values(foundUser.roles)
        // creando el jsonwebtoken,firmando accestoken &&refreshtoken 
        const accessToken = JWT.sign(
            {
                "userInfo": {
                    "username": foundUser.username,
                    "roles": roles
                }

            },
            `${process.env.ACCESS_TOKEN_SECRET}`,
            { expiresIn: "60s" }
        )


        const refreshToken = JWT.sign(
            { "username": foundUser.username },
            `${process.env.REFRESH_TOKEN_SECRET}`,
            { expiresIn: '1d' })


        //guardando el Token en usuario actual
        const otherUsers = data.users.filter(person => person.username !== foundUser.username)
        const currentUser = { ...foundUser, refreshToken }
        data.setEmployees([...otherUsers, currentUser]);

        //escribiendo el json que simula la base de datos
        await fsPromises.writeFile(path.join(__dirname, "..", "model", "user.json"), JSON.stringify(data.users));

        // res.status(201).json({ 'message': `reiniciando sesion` })


        // await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'user.json'), JSON.stringify(data.users))


        //enviando token 
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })
        res.json({ accessToken })
        // res.json({ 'message': 'succesfully logged in' })
    } else {
        res.sendStatus(401)
    }




}

module.exports = { verification };