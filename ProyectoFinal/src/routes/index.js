const { Router } = require('express')
const router = Router()

const productos = require('./productos.js')
const carrito = require('./carrito.js');

router.use('/productos', productos)
router.use('/carrito', carrito);

module.exports = router;