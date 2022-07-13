const express = require(`express`)
const app = express()
const { Server: IOServer } = require('socket.io')
const puerto = 8080
const database = require("./database")
const database2 = require("./database2")


//CLASES
const ContenedorProductos = require('./Class/productosClass')
const contenedorProductos = new ContenedorProductos(database.databaseConnection, 'product')

const ContenedorChat = require('./Class/chatClass')
const contenedorChat = new ContenedorChat(database2.databaseConnection, 'messages')

//RUTA ESTATICA
app.use(express.static(__dirname + `/../public`))

//SERVER
const expressServer = app.listen(puerto, (error) => {
    if (error) {
        console.log(`Hubo un error al iniciar el servidor: ${error}`)
    } else {
        console.log(`Servidor escuchando puerto ${puerto}`)
    }
})

const io = new IOServer(expressServer)

//SOCKETS
io.on('connection', socket => {
    console.log('Se conectó el cliente con id: ', socket.id)

    //PRODUCTOS
    socket.emit('server:productos', contenedorProductos.getAll())
    socket.on('cliente:producto', productoInfo => {
        contenedorProductos.save(productoInfo)
        io.emit('server:productos', contenedorProductos.getAll())
    })

    //CHAT
    socket.emit('server:mensajes', contenedorChat.getAll())
    socket.on('cliente:mensaje', mensaje => {
        contenedorChat.save(mensaje)
        io.emit('server:mensajes', contenedorChat.getAll())
    })



})