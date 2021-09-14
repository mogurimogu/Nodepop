'use strict'

const express = require('express');
const router = express.Router();
const Producto = require('../../models/Product');

router.get('/', async(req, res, next) => {
    try {
        
    } catch (err) {
        next(err)
    }
});

module.exports = router;