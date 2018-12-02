/**este archivo se encargara de manejar las rutas
 * de ser necesario agregar mas es en este donde se crean
 */
'use strict'
const express = require('express')

const api = express.Router()
const ProductsControler = require('../controlers/products')
const OrdersControler = require('../controlers/orders')
const UsersControler = require('../controlers/users')
const auth = require('../middlewares/auth')

/**se crean las URLs products*/
api.get('/products', ProductsControler.getProducts)
api.get('/products/:productId', ProductsControler.getProduct)
api.post('/products', ProductsControler.saveProducts)
api.put('/products/:productId',auth , ProductsControler.updateProduct)
api.delete('/products/:productId',auth , ProductsControler.deleteProduct)

/**se crean las URLs orders*/
api.get('/orders', OrdersControler.getOrders)
api.get('/orders/:orderId', OrdersControler.getOrder)
api.post('/orders' , OrdersControler.saveOrder)
api.put('/orders/:orderId',auth , OrdersControler.updateOrder)
api.delete('/orders/:orderId',auth , OrdersControler.deleteOrder)
/**para probar la logica del token
api.get('/testToken', auth, (req, res)=> {
    res.status(200).send({message: 'good!'})
} ) */

/**se implementan las rutas para crear usuarios */
api.post('/singup', UsersControler.singUp)
api.post('/singin', UsersControler.singIn)

module.exports = api