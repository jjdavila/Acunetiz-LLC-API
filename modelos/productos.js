'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProducosSchema = Schema({
    nombre: String,
    precio: {type: Number, default: 0},
    categoria: {type: String, enum: ['computer', 'phone', 'accesorios'] },
    descripcion: String
})


module.exports = mongoose.model('Producto', ProducosSchema)