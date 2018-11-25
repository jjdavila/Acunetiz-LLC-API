'use strict'
const Product = require('../models/products')

function getProduct(req, res){
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if(err) res.status(500).send({message:`Error al realizar la peticion ${err}`})
        if(!product) res.status(404).send({message:`El producto no existe ${err}`})
        res.status(200).send({product})
    })
}

function getProducts(req, res){
 
    Product.find({}, (err, products)  => { 
        if(err) res.status(500).send({message: `Error al realizar la peticion ${err}`})
        if(!products) res.status(404).send({message:`No existen productos ${err}`})
        res.status(200).send({products})
    })
}


function saveProducts(req, res){
     
    console.log('POST api/products/')
    console.log(req.body)
   let product = new Product()
   product.name = req.body.name
   product.price = req.body.price
   product.category = req.body.category
   product.description = req.body.description
   
   product.save((err, produtSaved)=> {
       if(err) res.status(500).send({message:`error al salvar a la base de datos${err}`})

       res.status(200).send({product: produtSaved})
   })
}
function updateProduct(req, res){
    let productId = req.params.productId
    let update = req.body

    Product.findOneAndUpdate(productId, update, (err, productoUpdated) =>{
        if(err) res.status(500).send({message:`Error al actualizar el producto ${err}`})
        if(!productoUpdated) res.status(404).send({message:`El producto no existe ${err}`})
        res.status(200).send({product: productoUpdated})
    })
}

function deleteProduct(req, res){
    let productId = req.params.productId

    Product.findById(productId, (err, product) => {
        if(err) res.status(500).send({message:`Error al realizar la peticion ${err}`})
        if(!product) res.status(404).send({message:`El producto no existe ${err}`})

        product.remove(err =>{
            if(err) res.status(500).send({message:`Error al borrar el producto ${err}`})
            res.status(200).send({message:`El producto ha sido eliminado`})
        })
        
    })
}


module.exports = {
    getProduct,
    getProducts,
    saveProducts,
    updateProduct,
    deleteProduct,
}