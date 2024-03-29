"use strict";
const { Producto } = require("../models");

class AnuncioController {
  async post(req, res, next) {
    const foto = `${req.file.destination.replace("public", ".")}/${
      req.file.filename
    }`;

    const thumbnail = req.body.thumbnail.replace("public", ".")

    try {
      console.log(req.body)
      const anuncio = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        venta: req.body.venta,
        tags: req.body.tags,
        foto,
        thumbnail,
      };

      const producto = new Producto(anuncio);
      const productoCreado = await producto.save();
      res.status(201).json({ result: productoCreado });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AnuncioController;
