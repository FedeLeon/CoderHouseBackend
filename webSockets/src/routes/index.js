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
           return contenido
        } catch (err) {
            console.log(`Error: ${err}`)
        }
    }

    // recibe un id y devuelve el objeto con ese id si no existe devolver null

    async getById(id) {
        try {
            let contenido = this.producto
            let objetoEncontrado = contenido.find(i => i.id === id)
            if (!objetoEncontrado) {
                console.log(`El ID no pertenece a ningun objeto`)
                return null
                
            } else {
                console.log(`El ID pertenece al objeto: ${objetoEncontrado.title}`)
                return objetoEncontrado
            }

        } catch (err) {
            console.log(`Hubo un error: ${err}`);
        }
    }

    //guardar el objeto en el archivo y devolver el id asignado 

    async postProduct(obj) {
        try {
            let id = contenedorProductos.idContador
            contenedorProductos.idContador
            let nuevoProducto = {...obj , id : id }
            this.producto.push(nuevoProducto)
            console.log(`Objeto con id : ${nuevoProducto.id} agregado`)
            return nuevoProducto
        } catch (err) {
            console.log(`No se pudeo agregar el objeto: ${err}`)
        }
    }

    // modifica un producto

    async putProduct(obj) {
        try {
            let contenido = this.producto
            contenido.forEach(element => {
             if(element.id === obj.id) {
                element = obj
             }
            })
            console.log(this.producto)
            return this.producto
            
        } catch (err) {
            console.log(`No se encontro el objeto con ese ID : ${err}`)
        }
    }

    // borrar el elemento segun el id que le pasemos en el archivo 

    async deleteById(id) {
        try {
            let contenido = this.producto
            let contenidoFiltrado = contenido.filter(i => i.id != id)
            this.producto = contenidoFiltrado
            return this.producto
        } catch (err) {
            console.log(`Hubo un error en recuperar el objeto por ID : ${err}`)
        }
    }
}

const contenedorProductos = new Contenedor(productos)

//RUTAS

router.get('/productos', (req, res) => {
    res.render('productos', { productos, hasAny: true })
})

router.get(`/productos/:id`, (req , res)=>{
    const id = Number(req.params.id)
    contenedorProductos.getById(id).then(i => res.render('productoId', productos[id-1]))
})

router.post(`/productos`, (req , res )=>{
    const { title, price, thumbnail } = req.body
    contenedorProductos.postProduct({ title, price, thumbnail }).then(i => res.render('productoAdd', productos[i.id]))
})

router.put(`/productos/:id` ,(req , res)=>{
    const { title, price, thumbnail, id } = req.body
    contenedorProductos.putProduct({ title, price, thumbnail, id }).then(i => res.json(i))
})

router.delete(`/productos/:id` ,(req , res)=>{
    const id = Number(req.params.id)
    contenedorProductos.deleteById(id).then(i => res.json(i))
})






module.exports = router