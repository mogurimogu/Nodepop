const { json } = require('express');
var express = require('express');
var router = express.Router();

var listaProductos = 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  console.log(listaProductos)
});

module.exports = router;
