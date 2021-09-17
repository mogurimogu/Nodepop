'use strict'

const express = require('express');
const router = express.Router();
const Producto = require('../../models/Product');

router.get('/', async (req, res, next) => {
    try {
        const tags = await Producto.tags()

        res.json({result: tags})

    } catch (err) {
        next(err)
    }
});

module.exports = router;