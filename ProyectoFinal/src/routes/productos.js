const { Router } = require('express')
const router = Router()

const { getAll, getById, saveProduct, putProduct, deleteProduct } = require('../controllers/productosController.js')

//RUTAS PRODUCTOS

// Devuelve todos los productos
router.get('/', getAll);

// Devuelve un producto según su id
router.get('/:id', getById);

// Recibe y agrega un producto, lo devuelve con su id asignado
router.post('/', saveProduct);

// Recibe y actualiza un producto segun su id
router.put('/:id', putProduct);

// Elimina un producto según su id
router.delete('/:id', deleteProduct);

module.exports = router;