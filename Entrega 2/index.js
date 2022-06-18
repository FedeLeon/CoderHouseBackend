const fs = require(`fs`);

//CONTENEDOR

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo
        fs.promises.writeFile(`./${nombreArchivo}`, ``)
    }

    static idContador = 1


    //guardar el objeto en el archivo y devolver el id asignado 

    async save(obj) {
        try {
            let inventary = await fs.promises.readFile(`${this.nombreArchivo}`, 'utf-8')
            console.log(inventary)
            if (!inventary) {
                console.log(`Se agrego el objeto, ID asignado: ${Contenedor.idContador}`)
                Contenedor.idContador++
                const arrObjs = [obj]
                await fs.promises.writeFile(`${this.nombreArchivo}`, JSON.stringify(arrObjs))
                return Contenedor.idContador
            } else {
                console.log(`Se agrego el objeto, ID asignado: ${Contenedor.idContador}`)
                Contenedor.idContador++
                inventary = JSON.parse(inventary);
                inventary.push(obj)
                await fs.promises.writeFile(`${this.nombreArchivo}`, JSON.stringify(inventary))
                return Contenedor.idContador
            }
        } catch (err) {
            console.log(`No se pudeo agregar el objeto: ${err}`)
        }
    }
    // recibe un id y devuelve el objeto con ese id si no existe devolver null

    async getById(id) {
        try {
            let contenido = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            let contenidoParseado = JSON.parse(contenido)
            let objetoEncontrado = contenidoParseado.find(item => item.id == id)
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

    // devolver un array de objetos con todos los objetos que esten el archivo 

    async getAll() {
        try {
            let contenido = await fs.promises.readFile(`${this.nombreArchivo}`, "utf-8")
            let contenidoParseado = JSON.parse(contenido)
            console.log(contenidoParseado)
            return contenidoParseado
        } catch (err) {
            console.log(`Hubo un error : ${err}`)
        }
    }

    // borrar el elemento segun el id que le pasemos en el archivo 

    async deleteById(id) {
        try {
            let contenido = await fs.promises.readFile(`${this.fileName}`, "utf-8")
            let contenidoParseado = JSON.parse(contenido)
            let nuevoArray = contenidoParseado.filter((item) => item.id != id)
            fs.promises.writeFile(`${this.nombreArchivo}`, JSON.stringify(nuevoArray))
            console.log(`Objeto con id : ${id} borrado`)
        } catch (err) {
            console.log(`Hubo un error en recuperar el objeto por id : ${err}`)
        }
    }

    // elimina todos 

    async deleteAll() {
        try {
            await fs.promises.writeFile(`./${this.fileName}`, ``)
            console.log("Se han borrado todos los items")
            Contenedor.idContador = 1
        } catch (err) {
            console.log(`Hubo un error: ${error}`);
        }
    }


}

const contenedorProductos = new Contenedor("productos.txt")

async function cargarProductos() {
    await contenedorProductos.save({ title: "cartuchera", price: 100, thumbnail: "https://d3ugyf2ht6aenh.cloudfront.net/stores/891/147/products/15222071-151595990d47d4f35b16467701309837-1024-1024.jpg", id: Contenedor.idContador })
    await contenedorProductos.save({ title: "lapiz", price: 300, thumbnail: "https://papeleria24h.files.wordpress.com/2019/03/punta-lapiz-staedtler-tradition-110.jpg?w=982", id: Contenedor.idContador })
    await contenedorProductos.save({ title: "carpeta", price: 500, thumbnail: "https://www.rioshopdeco.com.ar/6534-large_default/carpeta-pp-tonalizada-escolar-3x40-azul-art-5401.jpg", id: Contenedor.idContador })
}

cargarProductos()

//SERVIDORES WEB

const express = require ('express')
const app = express()
const puerto = 8080

app.listen(puerto, () => {
    console.log(`El servidor se inicio en el puerto ${puerto}`)
})

app.get('/', (req, res) => {
    res.send(`Home`)
})

app.get('/productos', (req, res) => {
    res.json(contenedorProductos.getAll())
    })

app.get('/productoRamdom', (req, res) => {
    let numRamdom = Math.floor(Math.random() * (Contenedor.idContador - 0))
    let productoRamdom = contenedorProductos.getById(numRamdom)
    res.json(productoRamdom)
})
