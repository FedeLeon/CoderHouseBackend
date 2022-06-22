const express = require(`express`)
const app = express()
const rutas = require('./routes/index')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'pug')

app.use('/api', rutas)

app.use(express.static(__dirname + `/public`))

app.listen(8080, ()=> {
    console.log("Escuchando el puerto 8080")
})