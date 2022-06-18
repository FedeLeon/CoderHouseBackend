const { Router } = require(`express`)
const router = Router()
let productos = [
    {
      "title": "Escuadra",
      "price": 123.45,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
      "id": 1
    },
    {
      "title": "Calculadora",
      "price": 234.56,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
      "id": 2
    },
    {
      "title": "Globo Terráqueo",
      "price": 345.67,
      "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
      "id": 3
    }
]

//CONTENEDOR

class Contenedor {
    constructor(producto) {
        this.producto = producto
    }
        
    static idContador = 1

    // devolver un array de objetos con todos los objetos que esten el archivo 

    async getAll() {
        try {
           let contenido = this.producto
           return await contenido
        } catch (err) {
            console.log(`Error: ${err}`)
        }
    }

    // recibe un id y devuelve el objeto con ese id si no existe devolver null

    async getById(id) {
        try {
            let contenido = this.producto
            let objetoEncontrado = contenido.find(i => i.id === id)
            if (objetoEncontrado) {
                console.log(`El ID pertenece al objeto: ${objetoEncontrado.title}`)
                return objetoEncontrado
            } else {
                console.log(`El ID no pertenece a ningun objeto`)
                return null
            }

        } catch (err) {
            console.log(`Hubo un error: ${err}`);
        }
    }

    //guardar el objeto en el archivo y devolver el id asignado 

    async postProduct(obj) {
        try {
            let id = this.producto.length
            let nuevoProducto = {...obj , id : id }
            this.producto.push(nuevoProducto)
            console.log(`Objeto con id : ${nuevoProducto.id} agregado`)
            return nuevoProducto
        } catch (err) {
            console.log(`No se pudeo agregar el objeto: ${err}`)
        }
    }

    // modifica un producto

    async putProduct(id) {
        try {
            let contenido = this.producto
            let objetoEncontrado = contenido.find(i => i.id === id)
            return objetoEncontrado
            
        } catch (err) {
            console.log(`No se encontro el objeto con ese ID : ${err}`)
        }
    }

    // borrar el elemento segun el id que le pasemos en el archivo 

    async deleteById(id) {
        try {
            let nuevoArray = this.product.filter(i => i.id != id)
            productos = nuevoArray
            return productos
        } catch (err) {
            console.log(`Hubo un error en recuperar el objeto por ID : ${err}`)
        }
    }
}

const contenedorProductos = new Contenedor(productos)

//RUTAS

router.get(`/productos`, (req , res)=>{
    contenedorProductos.getAll().then(r =>res.json(r))})

router.get(`/productos/:id`, (req , res)=>{
    const id = Number(req.params.id)
    contenedorProductos.getById(id).then(i => res.status(200).json(i))
})

router.post(`/productos`, (req , res )=>{
    const { title, price, thumbnail } = req.body
    contenedorProductos.postProduct({ title, price, thumbnail }).then(i => res.send({msg:`El id del producto agregado es: ${i.id}`}))
})

router.put(`/productos/:id` ,(req , res)=>{
    const { title, price, thumbnail } = req.body
    const id = Number(req.params.id)
    contenedorProductos.putProduct(id)
   
})

router.delete(`/productos/:id` ,(req , res)=>{
    const id = Number(req.params.id)
    contenedorProductos.deleteById(id).then(i => res.send({msg:`El id del producto eliminado es ${i.id}`}))
})






module.exports = router