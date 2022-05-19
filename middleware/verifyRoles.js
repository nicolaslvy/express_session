const verifyRoles = (...allowedRoles)=>{
    return (req,res,next)=>{
        if(!req?.roles) return res.sendStatus(401);
        const allowedRolesArrray = [...allowedRoles]
        //buscando rol permitido en los roles enviados
        const checkingRoles = req.roles.map(rol => allowedRolesArrray.includes(rol)).find(rol => rol === true);
        if (!checkingRoles) return res.sendStatus(401);
        next();


    }
}
module.exports = verifyRoles;