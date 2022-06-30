const express = require(`express`)
const app = express()
const { Server: IOServer } = require('socket.io')
const rutas = require('./routes/index')
const path = require('path')
const puerto = 8080
const { engine } = require('express-handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//ENGINE HANDLEBARS
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './views/layout/main.hbs'),
    layoutsDir: path.join(__dirname, './views/layout'),
    partialsDir: path.join(__dirname, './views/partials')
}))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'hbs')


//RUTAS
app.use('/api', rutas)
app.use(express.static(__dirname + `/public`))

app.get(`/api`, (req , res ) => {
    res.sendFile(__dirname + `/public/index.html`)
})

//SERVER
const expressServer = app.listen(puerto, (error) => {
    if(error) {
        console.log(`Hubo un error al iniciar el servidor: ${error}`)
    } else {
        console.log(`Servidor escuchando puerto ${puerto}`)
    }
})

const io = new IOServer(expressServer)

io.on('connection', socket => {
    console.log('Se conectó el cliente con id: ', socket.id)
    socket.on('cliente:producto', productoInfo => {
        socket.emit('server:producto', productoInfo)
    })

})