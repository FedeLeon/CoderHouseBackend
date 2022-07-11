const { Contenedor } = require('../clases/contenedor')
const { Producto } = require('../clases/producto')


//BASE DATOS PRODUCTOS

const contenedorProductos = new Contenedor('./productos.txt');


//FUNCIONES
// Devuelve todos los productos
const getAll = async (req, res) => {
    try {
        res.json(await contenedorProductos.getAll());
    } catch (e) { 
        res.status(500).json({ error: e });
    }
}

// Devuelve un producto según su id
const getById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const productoEncontrado = await contenedorProductos.getById(id)

        if (productoEncontrado) {
            res.status(200).json(productoEncontrado);
        } else {
            res.status(200).json(null);
        }

    } catch (e) { 
        res.status(500).json({ error: e });
    }
}

// Recibe y agrega un producto, lo devuelve con su id asignado
const saveProduct = async (req, res) => {
    try {
        const { title, description, thumbnail, price, stock } = req.body
        const nuevoProducto = new Producto( title, description, thumbnail, Number(price), Number(stock))
        let save = await contenedorProductos.save(nuevoProducto);

        res.status(201).json(save)
    } catch (e) { 
        res.status(500).json({ error: e })
    }
}

// Recibe y actualiza un producto segun su id
const putProduct = async (req, res) => {
    try {
        const { title, description, thumbnail, price, stock} = req.body
        const id = Number(req.params.id)
        const productoEncontrado = await contenedorProductos.getById(id)

        if (productoEncontrado) {
            productoModif = new Producto( title, description, thumbnail, Number(price), Number(stock))
            await contenedorProductos.putProduct(id, productoModif)
            res.status(200).json('Producto modificado')
        } else {
            res.status(200).json('No se pude modificar el producto')
        }

    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Elimina un producto según su id
const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const producto = await contenedorProductos.getById(id);

        if (producto) {
            await contenedorProductos.deleteById(id);
            res.status(200).json('Producto eliminado')
        } else {
             res.status(200).json('No se pudo eliminar el producto')
        }

    } catch (e) {
        res.status(500).json({ error: e });
    }
}

module.exports = { getAll, getById, saveProduct, putProduct, deleteProduct }