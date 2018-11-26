'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Products = mongoose.model('Product');

const OrdersSchema = Schema({
    quantity: {type: Number, default: 0},
    product: {type: Schema.ObjectId, ref: "Products" }
})


module.exports = mongoose.model('Order', OrdersSchema)