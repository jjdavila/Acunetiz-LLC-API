'use strict'
const services = require('../services')


function isAuth(req, res, next){
    if(!req.header.authorization){
        return res.status(403).send({message: 'no tiene autorizacion'})
    }
    const token = req.header.autorization.split(" ")[1]
    services.decodeToken(token)
    .then(response => {
        req.user = response
        next()
    })
    .catch(response => {
        req.status(response.status)
        next()
    })
}


module.exports = isAuth