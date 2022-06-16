const express = require(`express`)
const app = express()
const rutas = require('./routes/index')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get(`/app`, (req , res ) => {
    res.sendFile(__dirname + `/public/index.html`)
})


app.use('/api', rutas)

app.listen(8080, ()=> {
    console.log("Escuchando el puerto 8080")
})