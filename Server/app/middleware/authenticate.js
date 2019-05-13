const {User} = require('../models/user')
function authenticateUser(req,res,next){
    const token = req.header('x-auth')
    if(token){
    User.findByToken(token)
    .then((user)=>{
        req.user = user
        req.token = token
        next()
    })
    }
    else{
        res.send('token not provided')
    }
}
module.exports = {
    authenticateUser
}