const { Router } = require('express');
const router = Router();

const { newCart, deleteCart, getProductsCart, addProduct, deleteProduct } = require('../controllers/carritoController.js');

//RUTAS CARRITO

//Crea un carrito y devuelve su id
router.post('/', newCart)

//Elimina un carrito según su id
router.delete('/:id', deleteCart)

//Devuelve todos los productos de un carrito
router.get('/:id/productos', getProductsCart)

//Recibe y agrega un producto en el carrito
router.post('/:id/productos', addProduct)

// // Elimina un producto de un carrito según sus id
router.delete('/:id/productos/:id_prod', deleteProduct)

module.exports = router;