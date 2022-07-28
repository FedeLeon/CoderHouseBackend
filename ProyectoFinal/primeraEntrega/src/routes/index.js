const { Router } = require('express')
const router = Router()

const productos = require('./productosRoutes.js')
const carrito = require('./carritoRoutes.js');

router.use('/productos', productos)
router.use('/carrito', carrito);

module.exports = router;