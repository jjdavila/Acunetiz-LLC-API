/**este archivo se encargara de manejar las rutas
 * de ser necesario agregar mas es en este donde se crean
 */
'use strict'
const express = require('express')

const api = express.Router()
const ProductsControler = require('../controlers/products')
const UsersControler = require('../controlers/users')
const auth = require('../middlewares/auth')

/**se crean las URLs */
api.get('/products', ProductsControler.getProducts)
api.get('/products/:productId', ProductsControler.getProduct)
api.post('/products',auth , ProductsControler.saveProducts)
api.put('/products/:productId',auth , ProductsControler.updateProduct)
api.delete('/products/:productId',auth , ProductsControler.deleteProduct)
/**para probar la logica del token */
api.get('/testToken', auth, (req, res)=> {
    res.status(200).send({message: 'good!'})
} )
module.exports = api