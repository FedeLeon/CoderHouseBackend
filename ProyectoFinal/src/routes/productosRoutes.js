const { Router } = require('express')
const router = Router()

const { getAll, getById, saveProduct, putProduct, deleteProduct } = require('../controllers/productosController.js')
const { checkAdmin } = require('../middlewares/middlewares')

//RUTAS PRODUCTOS

// Devuelve todos los productos
router.get('/', getAll);

// Devuelve un producto según su id
router.get('/:id', getById);

// Recibe y agrega un producto, lo devuelve con su id asignado
router.post('/', checkAdmin, saveProduct);

// Recibe y actualiza un producto segun su id
router.put('/:id', checkAdmin, putProduct);

// Elimina un producto según su id
router.delete('/:id', checkAdmin, deleteProduct);

module.exports = router;