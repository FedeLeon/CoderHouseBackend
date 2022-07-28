const { Producto } = require('../clases/producto')
const { Contenedor } = require('../clases/contenedor')


//BASE DE DATOS DE CARRITOS

const contenedorCarritos = new Contenedor('./carrito.txt')


//FUNCIONES

//Crea un carrito

const newCart = async (req, res) => {
    try {
        const { title, description, thumbnail, price, stock } = req.body
        const nuevoProducto = new Producto( title, description, thumbnail, Number(price), Number(stock))

        const newCarrito = {
            id: Contenedor.idContador,
            time: new Date(Date.now()),
            products: [nuevoProducto]
        }
        console.log(newCarrito)
        contenedorCarritos.save(newCarrito).then(i => res.send(`el id del carrito creado es ${i}`))
        } catch (e) { 
        res.status(500).json({"Se ha producido un error catastrofico": e})
    }
}

const deleteCart = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const carritoObtenido = await contenedorCarritos.getById(id)

        if (carritoObtenido) {
            await contenedorCarritos.deleteById(id);
            res.status(200).json('Carrito eliminado')
        } else {
             res.status(200).json('No se pudo eliminar el carrito')
        }

    } catch (e) {
        res.status(500).json({"Se ha producido un error catastrofico": e})
    }
}

const getProductsCart = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const carritoEncontrado = await contenedorCarritos.getById(id)

        if (carritoEncontrado) {
            const products = carritoEncontrado.products
            res.status(200).json(products)
        } else {
            res.status(200).json(null)
        }

    } catch (e) { 
        res.status(500).json({"Se ha producido un error catastrofico": e})
    }
}

const addProduct = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const { title, description, thumbnail, price, stock } = req.body
        const nuevoProducto = new Producto( title, description, thumbnail, Number(price), Number(stock))
        const carritoEncontrado = await contenedorCarritos.getById(id)
        carritoEncontrado.products.push(nuevoProducto)
        res.status(200).json("Producto agregado")
    } catch (e) { 
        res.status(500).json({"Se ha producido un error catastrofico": e})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const idProduct = Number(req.params.id_prod)
        contenedorCarritos.deleteProduct(id, idProduct).then(i => res.send(i))

    } catch (e) { 
        res.status(500).json({"Se ha producido un error catastroficoooo": e})
    }
}

module.exports = { newCart, deleteCart, getProductsCart, addProduct, deleteProduct } 