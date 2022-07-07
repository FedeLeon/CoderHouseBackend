// CONFIG
const express = require('express');
const path = require('path');
const app = express();
const puerto = 8080
const routes = require('./routes/index.js');


//JSON Y RUTA ESTATICA
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname + '../public')))
app.get(`/api`, (req , res ) => {
    res.sendFile(path.join((__dirname + '/../public/index.html')))
})


// API
app.use('/api', routes);

//SERVER
app.listen(puerto, (error) => {
    if (!error) {
        console.log(`El servidor se inicio en el puerto ${puerto}`);
    } else {
        console.log(`Error al iniciar el servidor en el puerto ${puerto}. Error ${error}`);
    }
})