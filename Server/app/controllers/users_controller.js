const express = require('express')
const { User} = require('../models/user')
const {authenticateUser} = require('../middleware/authenticate')
const router = express.Router()
router.post('/register', (req, res) => {
    const body = req.body
    const user= new User(body)
    user.save()
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
})
router.post('/login', (req, res) => {
    console.log('in login',req.body.email,req.body.password)
    User.findByEmailAndPassword(req.body.email, req.body.password)
        .then((user) => {
            console.log('in .then of login response came',user)
            return user.generateToken()
        })
        .then((token) => {
            res.send({
                token,
                notice: 'login successfully'
            })
        })
        .catch((err) => {
            res.send(err)
        })
})
router.get('/', (req, res) => {
    User.find()
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
})
router.get('/:id', authenticateUser,(req, res) => {
   user.findById(req.params.id)
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
})
router.delete('/:id', authenticateUser,(req, res) => {
    const id = req.params.id
   User.findByIdAndDelete(id)
        .then((user) => {
            res.send({
               user,
                notice: 'deleted successfully'
            })
        })
        .catch((err) => {
            res.send(err)
        })
})
router.put('/:id', authenticateUser,(req, res) => {
    const body = req.body
    const id = req.params.id
   User.findByIdAndUpdate(id, {$set:body}, { new: true })
        .then((user) => {
            res.send({
               user,
                notice: 'updated successfully'
            })
        })
        .catch((err) => {
            res.send(err)
        })
})
router.delete('/logout',authenticateUser,(req,res)=>{
    console.log('entered')
    const token = req.token
    const user = req.user
    //console.log(user)
    var tokensArray=user.tokens
    // for(let i=0;i<tokensArray.length;i++){
    //     if(tokensArray[i].token==token)
    //     {
    //         tokensArray.splice(i,1)
    //         //console.log('deleted')
    // }
    // }
    user.tokens = user.tokens.filter(t => t.token != token )
    user.save()
    .then((user)=>{
        res.send('deleted token')
    })
    .catch((err)=>{
        res.send(err)
    })
})
router.delete('/logoutfromall',authenticateUser,(req,res)=>{
    const user = req.user
    console.log(user._id)
    User.findByIdAndUpdate({_id : user._id},{$set:{tokens:[]}},{new : true})
    .then((user)=>{
        res.send({
            user,
            notice : 'logged out'
        })
    })
    .catch((err)=>{

    })
    
    
})

module.exports = {
   userRouter: router
}