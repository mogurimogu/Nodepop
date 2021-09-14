'use strict';

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: Array
});

productSchema.statics.lista = function(filtro){
    const query = Producto.find(filtro);
}

const Producto = mongoose.model('Producto', productSchema);

module.exports = Producto;