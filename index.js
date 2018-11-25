'use strict'
/**creamos una constante que contendra la importacion de la
 *  libreria expreess */
const express = require('express')
/**libreria para parsear el cuerpo  de los request */
const bobyParser = require('body-parser')
const mongoose = require('mongoose')
const Producto = require('./modelos/productos')
/**creamos una constante app que copntendra nuestro servidor */
const app = express()
const port = process.env.PORT || 3000

app.use(bobyParser.urlencoded({extended: false}))
app.use(bobyParser.json())

/**se crean las URLs */
app.get('/api/productos', (req, res) => {
    
    Producto.find({}, (err, productos)  => { 
        if(err) res.status(500).send({message: `Error al realizar la peticion ${err}`})
        if(!productos) res.status(404).send({message:`No existen productos ${err}`})
        res.status(200).send({productos})
    })
   
})

app.get('/api/productos/:idProducto', (req, res) => {
    let productoId = req.params.idProducto

    Producto.findById(productoId, (err, producto) => {
        if(err) res.status(500).send({message:`Error al realizar la peticion ${err}`})
        if(!producto) res.status(404).send({message:`El producto no existe ${err}`})
        res.status(200).send({producto})
    })
})

app.post('/api/productos', (req, res) => {
     
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
})

app.put('/api/productos/:idProductos', (req, res) => {
    let productoId = req.params.idProducto
    let update = req.body

    Producto.findOneAndUpdate(productoId, update, (err, productoActualizado) =>{
        if(err) res.status(500).send({message:`Error al actualizar el producto ${err}`})
        if(!productoActualizado) res.status(404).send({message:`El producto no existe ${err}`})
        res.status(200).send({producto: productoActualizado})
    })
     
})

app.delete('/api/productos/:idProducto', (req, res) => {
    let productoId = req.params.idProducto

    Producto.findById(productoId, (err, producto) => {
        if(err) res.status(500).send({message:`Error al realizar la peticion ${err}`})
        if(!producto) res.status(404).send({message:`El producto no existe ${err}`})

        producto.remove(err =>{
            if(err) res.status(500).send({message:`Error al borrar el producto ${err}`})
            res.status(200).send({message:`El producto ha sido eliminado`})
        })
        
    })
     
})


mongoose.connect('mongodb://localhost:27017/AcunetisProducts', (err, res) => {
    if(err){
        console.log(`error al conectar a la base de datos ${err}`)
    }
    console.log('conexion a la base de datos establecida')
    /**se inicializa el servidor usando una arrow function de ES6 */
    app.listen(port, () => {
        console.log(`API REST ejecutandoce en http://localhost:${port}`)
    })
    
})
