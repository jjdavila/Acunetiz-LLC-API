'use strict'
const express = require('express')

const api = express.Router()
const ProductosControlador = require('../controladores/productos')

/**se crean las URLs */
api.get('/productos', ProductosControlador.getProductos)
api.get('/productos/:idProducto', ProductosControlador.getProducto)
api.post('/productos', ProductosControlador.saveProductos)
api.put('/productos/:idProductos', ProductosControlador.updateProducto)
api.delete('/productos/:idProducto', ProductosControlador.deleteProducto)

module.exports = api