'use strict'
/**creamos una constante que contendra la importacion de la
 *  libreria expreess */
const express = require('express')
/**libreria para parsear el cuerpo  de los request */
const bobyParser = require('body-parser')
const ProductosControlador = require('./controladores/productos')

/**creamos una constante app que copntendra nuestro servidor */
const app = express()
app.use(bobyParser.urlencoded({extended: false}))
app.use(bobyParser.json())
/**se crean las URLs */
app.get('/api/productos', ProductosControlador.getProductos)
app.get('/api/productos/:idProducto', ProductosControlador.getProducto)
app.post('/api/productos', ProductosControlador.saveProductos)
app.put('/api/productos/:idProductos', ProductosControlador.updateProducto)
app.delete('/api/productos/:idProducto', ProductosControlador.deleteProducto)


module.exports = app