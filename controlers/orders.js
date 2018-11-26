/**contiene los controles del modelo orders */

'use strict'
const Order = require('../models/orders')
const Product = require('../models/products')

function getOrder(req, res){
    let orderId = req.params.orderId

    Order.findById(orderId, (err, product) => {
        if(err) res.status(500).send({message:`Error al realizar la peticion ${err}`})
        if(!product) res.status(404).send({message:`El producto no existe ${err}`})
        res.status(200).send({product})
    })
}

function getOrders(req, res){
 
    Order.find({}, (err, orders)  => { 
        if(err) res.status(500).send({message: `Error al realizar la peticion ${err}`})
        if(!orders) res.status(404).send({message:`No existen productos ${err}`})
        Product.populate(orders, {path: "product"}, (err, orders) =>{
            res.status(200).send({orders})
        })
        
    })
}

function saveOrder(req, res){
     
    console.log('POST api/products/')
    console.log(req.body)
   let order = new Order()
   order.quantity = req.body.quantity
   order.product = req.body.product

   
   order.save((err, orderSaved)=> {
       if(err) res.status(500).send({message:`error al salvar a la base de datos${err}`})

       res.status(200).send({order: orderSaved})
   })
}
function updateOrder(req, res){
    let orderId = req.params.orderId
    let update = req.body

    Order.findOneAndUpdate(orderId, update, (err, orderUpdated) =>{
        if(err) res.status(500).send({message:`Error al actualizar el producto ${err}`})
        if(!orderUpdated) res.status(404).send({message:`El producto no existe ${err}`})
        res.status(200).send({product: orderUpdated})
    })
}

function deleteOrder(req, res){
    let orderId = req.params.orderId

    Order.findById(orderId, (err, order) => {
        if(err) res.status(500).send({message:`Error al realizar la peticion ${err}`})
        if(!order) res.status(404).send({message:`El producto no existe ${err}`})

        order.remove(err =>{
            if(err) res.status(500).send({message:`Error al borrar el producto ${err}`})
            res.status(200).send({message:`El producto ha sido eliminado`})
        })
        
    })
}


module.exports = {
    getOrder,
    getOrders,
    saveOrder,
    updateOrder,
    deleteOrder,
}