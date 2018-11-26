'use strict'
const mongoose = require('mongoose')
const User = require('../models/users')
const Service = require('../services/')

function singUp(req, res){
    const user = new User({
        email: req.body.email,
        role:  req.body.role,
        password: req.body.password,
    })
   user.save((err) =>{
    if(err) res.status(500).send({message:`Error al crear el usuario ${err}`})

    return res.status(200).send({
        token: Service.createToken(user)
    })
        
   })
}

function singIn(req, res){

    User.find({ email: req.body.email }, (err, user)  => { 
        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: 'No existe el usuario' })

        req.user = user
        console.log(user)
        res.status(200).send({
        message: 'Te has logueado correctamente',
        token: Service.createToken(user),
        
        })
    })

    User.fi
}

module.exports = {
    singUp,
    singIn,
}   