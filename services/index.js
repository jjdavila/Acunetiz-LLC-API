'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')


function createToken(user){
    const payload = {
        sub: user._id,
        role:user.role,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token){
    /**hacemos uso de las promice de es6 para implementarlos de forma nativa */
    const decodeToken = new Promise((resove, reject) =>{
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN)

            if(payload.exp <= moment().unix()){

                reject = {
                    status: 401,
                    message: `El Token ha expirado, favor volver a revalidar el tokent `
                }
                
            }

            resove(payload.sub)
        }catch(err){
            reject = {
                status: 200,
                message: 'token invalido'
            }
        }
    })
    return decodeToken
}


module.exports ={createToken, decodeToken} 