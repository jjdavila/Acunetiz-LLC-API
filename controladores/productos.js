'use strict'
const Producto = require('../modelos/productos')

function getProducto(req, res){
    let productoId = req.params.idProducto

    Producto.findById(productoId, (err, producto) => {
        if(err) res.status(500).send({message:`Error al realizar la peticion ${err}`})
        if(!producto) res.status(404).send({message:`El producto no existe ${err}`})
        res.status(200).send({producto})
    })
}

function getProductos(req, res){
 
    Producto.find({}, (err, productos)  => { 
        if(err) res.status(500).send({message: `Error al realizar la peticion ${err}`})
        if(!productos) res.status(404).send({message:`No existen productos ${err}`})
        res.status(200).send({productos})
    })
}


function saveProductos(req, res){
     
    console.log('POST api/productos/')
    console.log(req.body)
   let producto = new Producto()
   producto.nombre = req.body.nombre
   producto.precio = req.body.precio
   producto.categoria = req.body.categoria
   producto.descripcion = req.body.descripcion
   
   producto.save((err, produtoSalvado)=> {
       if(err) res.status(500).send({message:`error al salvar a la base de datos${err}`})

       res.status(200).send({producto: produtoSalvado})
   })
}
function updateProducto(req, res){
    let productoId = req.params.idProducto
    let update = req.body

    Producto.findOneAndUpdate(productoId, update, (err, productoActualizado) =>{
        if(err) res.status(500).send({message:`Error al actualizar el producto ${err}`})
        if(!productoActualizado) res.status(404).send({message:`El producto no existe ${err}`})
        res.status(200).send({producto: productoActualizado})
    })
}

function deleteProducto(req, res){
    let productoId = req.params.idProducto

    Producto.findById(productoId, (err, producto) => {
        if(err) res.status(500).send({message:`Error al realizar la peticion ${err}`})
        if(!producto) res.status(404).send({message:`El producto no existe ${err}`})

        producto.remove(err =>{
            if(err) res.status(500).send({message:`Error al borrar el producto ${err}`})
            res.status(200).send({message:`El producto ha sido eliminado`})
        })
        
    })
}


module.exports = {
    getProducto,
    getProductos,
    saveProductos,
    updateProducto,
    deleteProducto,
}