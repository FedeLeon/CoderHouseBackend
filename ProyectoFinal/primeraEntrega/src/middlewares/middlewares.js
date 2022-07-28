// Verificacion de Admin
const checkAdmin = (req, res, next) => {
    if (req.body.administrador) {
        next()
    } else {
        res.status(403).send({ error: -1, descripcion: `Ruta y/o metodo no autorizados`})
    }
}

module.exports = { checkAdmin }