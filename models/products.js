'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductsSchema = Schema({
    name: String,
    price: {type: Number, default: 0},
    category: {type: String, enum: ['computer', 'phone', 'accesorios'] },
    description: String
})


module.exports = mongoose.model('Product', ProductsSchema)