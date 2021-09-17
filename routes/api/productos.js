'use strict'

const express = require('express');
const router = express.Router();
const Producto = require('../../models/Product');
const utils = require('../../lib/utils');

router.get('/', async (req, res, next) => {
    try {
        const nombre = req.query.nombre;
        const venta = req.query.venta;
        const precio = req.query.precio;
        const tags = req.query.tags;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const select = req.query.select;
        const sort = req.query.sort;

        const filtro = {}

        if(nombre){
            filtro.nombre = new RegExp('^' + nombre, "i");
        }

        if(venta){
            filtro.venta = venta
        }

        if(precio){
            let precioMin = parseInt(utils.priceSplitter(precio)[0])
            let precioMax = parseInt(utils.priceSplitter(precio)[1])    
            filtro.precio = {$gte: precioMin, $lte: precioMax}
        }

        if(tags){
            filtro.tags = tags
        }

        const productos = await Producto.lista(filtro, skip, limit, select, sort)
        res.json({result: productos})
        
    } catch (err) {
        next(err)
    }
});


// Crear nuevos elementos


router.post('/', async (req, res, next) => {
    try {

      const productoData = req.body;
      const producto = new Producto(productoData);
      const productoCreado = await producto.save();
      res.status(201).json({ result: productoCreado });

    } catch (err) {
        
      next(err);
    }
  });

// Para borrar un registro de la base de datos

router.delete('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        await Producto.deleteOne({_id: _id});
        res.json();
    } catch (err){
        next(err)
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const productData = req.body;
        const productoActualizado = await Producto.findOneAndUpdate({_id: _id}, productData, {
            new: true,
        });

        if(!productoActualizado){
            res.status(404).json({ error: 'not found'})
            return;
        }
        
        res.json({result: productoActualizado})
    } catch (err){
        next(err)
    }
});


module.exports = router;