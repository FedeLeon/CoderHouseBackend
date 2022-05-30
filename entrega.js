const fs = require(`fs`);



class Contenedor {
    constructor (nombreArchivo) {
        this.nombreArchivo = nombreArchivo
        }

    static idContador = 1


   async save(objeto, precio, direccionWeb, id) {
        let newProduct = {
                            title: (objeto),
                            price: (precio),
                            thumbnail: (direccionWeb),
                            idProduct: (id)
                          }
        try {
        Contenedor.idContador++
        await fs.promises.appendFile(`./${this.nombreArchivo}.txt`, `${JSON.stringify(newProduct)},\n`)
        console.log(`Objeto guardado, ID asignado: ${id}`);
        
        } catch(error) {
            console.log(`Ocurrio un error: ${error}`)
        } 
    }

    async getById(id) {
        try {
            let contenido = [await fs.promises.readFile(`./${this.nombreArchivo}.txt`, 'utf-8')]
            contenido = JSON.parse(contenido)
            console.log(contenido)
            
        } catch(error) {
            console.log(`Hubo un error: ${error}`);
        }
    }
    
}


const contenedorProductos = new Contenedor("productos")

//contenedorProductos.save(`Pizza`, 32, "Tutancamon.com", Contenedor.idContador)
//contenedorProductos.save(`Chorizo`, 25, "Tutancamon.com", Contenedor.idContador)
//contenedorProductos.save(`Raviolitos`, 100, "Tutancamon.com", Contenedor.idContador)

contenedorProductos.getById(2)

