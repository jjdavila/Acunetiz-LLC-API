'use strict'
const mongoose = require('mongoose')
const User = require('../models/users')
const Service = require('../services/')

function singUp(req, res){
    const user = new User({
        email: req.body.email,
        role:  req.body.role,
    })
   user.save((err) =>{
    if(err) res.status(500).send({message:`Error al crear el usuario ${err}`})

    return res.status(200).send({
        token: Service.createToken(user)
    })
        
   })
}

function singIn(req, res){
    User.find({}, (err, user)  => { 
        if(err) res.status(500).send({message: `Error al realizar la peticion ${err}`})
        if(!user) res.status(404).send({message:`No existen productos ${err}`})
        req.user = user
        res.status(200).send({
            message: 'login correcto',
            token: Service.createToken(user)
        })
    })
}

module.exports = {
    singUp,
    singIn 
}   