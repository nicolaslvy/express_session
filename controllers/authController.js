const bcrypt = require('bcrypt')
const data = {
    users: require('../model/user.json'),
    setEmployees: function (data) { this.user = data }
}

const verification = async (req,res)=>{
    const { user , pwd } = req.body
    if(!user || !pwd) return res.status(400).json({'message':'username and password are required'})
    const foundUser = data.users.find(usuario => usuario.username === user)
    if(!foundUser)return res.sendStatus(401);
    const match = await bcrypt.compare(pwd, foundUser.password)
    
    if(match){
        res.json({'message': 'succesfully logged in'})
    }else{
        res.sendStatus(401)
    }

    res.sendStatus(200); 


}

module.exports = {verification};