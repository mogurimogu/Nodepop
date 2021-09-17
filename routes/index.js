var express = require('express');
var router = express.Router();
const Producto = require('../models/Product');
const utils = require('../lib/utils');

/* GET home page. */  
  
router.get('/', async (req, res, next) => {
  try {
      const nombre = req.query.nombre;
      const venta = req.query.venta;
      const precio = req.query.precio;
      const tags = req.query.tags;
      let skip = parseInt(req.query.skip);
      let limit = parseInt(req.query.limit);
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

      
      const productos = await Producto.lista(filtro, skip || 0 , limit || 10, select, sort)
      
      res.render('index', { productos, paginacion: {nombre, venta, precio, tags, skip, limit} })

  } catch (err) {
      next(err)
  }
});

module.exports = router;
