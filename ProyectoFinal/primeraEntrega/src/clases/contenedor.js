const fs = require(`fs`)

//CONTENEDOR

class Contenedor {
    constructor(nombreArchivo) {
        this.timestamp = new Date(Date.now())
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
            return nuevoArray
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

    // borra un producto segun su id dentro de un carrito segund su id
    
    async deleteProduct(id, id_prod) {
        try {
            let contenido = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            let contenidoParseado = JSON.parse(contenido)
            let carritoEncontrado = contenidoParseado.find(item => item.id == id)
            let newArray = carritoEncontrado.products.filter((item) => item.id != id_prod)
            await fs.promises.writeFile(`${this.nombreArchivo}`, JSON.stringify(newArray))
            return { msj: "producto borrado " }


        } catch (err) {
            console.log(`Hubo un error: ${err}`);
        }

    }


    async putProduct(id, nuevoProducto) {
        try {
            let contenido = await fs.promises.readFile(`${this.nombreArchivo}`, "utf-8")
            contenido.forEach(element => {
             if(element.id === id) {
                element = nuevoProducto
             }
            })
            console.log(contenido)
            return contenido
            
        } catch (err) {
            console.log(`No se encontro el objeto con ese ID : ${err}`)
        }
    }


}

module.exports = {
    Contenedor: Contenedor,
};