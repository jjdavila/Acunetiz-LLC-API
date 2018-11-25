'use strict'
/**creamos una constante que contendra la importacion de la
 *  libreria expreess */
const express = require('express')
/**libreria para parsear el cuerpo  de los request */
const bobyParser = require('body-parser')
/**creamos una constante app que copntendra nuestro servidor */
const app = express()
const api = require('./routes')

app.use(bobyParser.urlencoded({extended: false}))
app.use(bobyParser.json())
app.use('/api', api)

module.exports = app