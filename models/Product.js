'use strict';

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: Array
});

productSchema.statics.lista = function(filtro, skip, limit, select, sort){
    const query = Producto.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.select(select);
    query.sort(sort);
    query
    return query.exec();
}

productSchema.statics.tags = function(){
    const query = Producto.find().distinct('tags');
    return query.exec();
}


const Producto = mongoose.model('Producto', productSchema);


module.exports = Producto;