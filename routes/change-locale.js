const express = require('express');
const { param } = require('.');
const router = express.Router();

router.get('/:locale', (req, res, next) =>{
    const locale = req.params.locale;

    res.cookie('nodeapi-locale', locale, {
        maxAge: 1000 * 60 * 60 * 24 * 7 //La cookie se mantiene durante 1 semana
    })

    res.redirect(req.get('referer'));
})

module.exports = router