'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UsersSchema = Schema({
    email: {type: String, unique: true, lowercase: true},
    role: {type: String, enum: ['admin', 'user'] },
    password: {type: String, select: false },
    siginDate: {type: Date, default: Date.now()},
    lastLogin: Date
})


UsersSchema.pre('save', ()=>{
    let user = this
    if(user.isModifield('password')) return next()

    bcrypt.genSalt(10, (err, salt) =>{
        if(err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash)=> {
            if(err) return next(err)

            user.password = hash
            next()
         })
    })
})



module.exports = mongoose.model('Users', UsersSchema)