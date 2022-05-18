const data = {
    users: require('../model/user.json'),
    setUsers: function (data) { this.users = data }
};

const path = require('path')
const fsPromises = require('fs').promises

const handleLogout = async (req, res) => {

    //deleta access token and cookie 
    //verificar si existe la cookie jwt
    let cookie = req.cookies
    if (!cookie?.jwt) return res.sendStatus(204); //code: no content
    const refreshToken = cookie.jwt

    //isRefreshtoken in db
    const foundUser = data.users.find(user => user.refreshToken === refreshToken)
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none' })
        res.sendStatus(204);
    }

    //filtrar usuarios diferentes al token, y seleccionar usuario y borrar token de acceso
    const otherUsers = data.users.filter(person => person.refreshToken !== foundUser.refreshToken)
    const currentUser = { ...foundUser, refreshToken: '' }
    //actualizando usuarios en json y borrar cookie 
    data.setUsers([...otherUsers, currentUser])  
    await fsPromises.writeFile(path.join(__dirname, "..", "model", "user.json"), JSON.stringify(data.users));
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none' })
    res.sendStatus(204);



}
module.exports = { handleLogout }


