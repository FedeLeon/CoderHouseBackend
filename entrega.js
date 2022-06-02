const fs = require(`fs`);



class Contenedor {
    constructor (nombreArchivo) {
        this.nombreArchivo = nombreArchivo
        fs.promises.writeFile(`./${nombreArchivo}.txt`, '[]')
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
        let dataArray = await fs.promises.readFile(`./${this.nombreArchivo}.txt`, 'utf-8')
        dataArray = JSON.parse(dataArray)
        dataArray.push(newProduct)
        await fs.promises.writeFile(`./${this.nombreArchivo}.txt`, JSON.stringify(dataArray))
        console.log(`Objeto guardado, ID asignado: ${id}`);
        
        } catch(error) {
            console.log(`Ocurrio un error: ${error}`)
        } 
    }

    async getById(id) {
        try {
            let contenido = JSON.parse(await fs.promises.readFile(`./${this.nombreArchivo}.txt`, 'utf-8'))
            console.log(contenido[0])
            
        } catch(error) {
            console.log(`Hubo un error: ${error}`);
        }
    }
    
}


const contenedorProductos = new Contenedor("productos")

contenedorProductos.save(`Pizza`, 32, "Tutancamon.com", Contenedor.idContador)
contenedorProductos.save(`Chorizo`, 25, "Tutancamon.com", Contenedor.idContador)
//contenedorProductos.save(`Raviolitos`, 100, "Tutancamon.com", Contenedor.idContador)

//contenedorProductos.getById(0)

