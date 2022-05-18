const path = require('path')
const fsPromises = require('fs').promises
const bcrypt = require('bcrypt')

const data = {
    users: require('../model/user.json'),
    setUsers: function (data) { this.users = data }

}

//prueba
require('dotenv').config()

console.log(process.env.ACCES_TOKEN_SECRET)
//final prueba


const register = async (req, res) => {
    const { user, pwd } = req.body
    if (!user || !pwd) {
        return res.status(400).json({ 'message': 'Username and password are required.' });
    }
    let usuario = data.users.find(usuario => usuario.username === user)
    if (usuario) return res.sendStatus(400);
    try {

        const hashedpwd = await bcrypt.hash(pwd, 10)
        const newUser = {
            "username": user,
            "roles": {
                "User": 2001
            },   
            "password": hashedpwd
        }
        data.setUsers([...data.users, newUser])
        await fsPromises.writeFile(path.join(__dirname, "..", "model", "user.json"), JSON.stringify(data.users));

        res.status(201).json({ 'message': `user ${newUser.username} created` })
    } catch (err) {
        res.status(501).json({ 'message': err.message })
    }



}


module.exports = { register };

