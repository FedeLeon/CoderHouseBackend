import { Router } from "express"
const router = Router()
import daos from "../daos/index.js"


//RUTAS PRODUCTOS

router.get("/productos", async (req, res) => {
  const response = await daos.ProductoDao.getAll();

  res.json(response)
})

router.get("/productos/:id", async (req, res) => {
  const response = await daos.ProductoDao.getById(req.params.id);

  res.json(response)
})


router.delete("/productos/:id", async (req, res) => {
  const response = await daos.ProductoDao.deleteById(req.params.id);

  res.json(response)
})

router.put("/productos/:id", async (req, res) => {
  const response = await daos.ProductoDao.update(req.params.id, req.body);

  res.json(response)
})


router.post('/productos', async (req, res) => {
  const response = await daos.ProductoDao.save(req.body)

  res.json(response)
})


//RUTAS CARRITO

router.get("/carritos", async (req, res) => {
  const response = await daos.CarritoDao.getAll()

  res.json(response)
})

router.get("/carritos/:id", async (req, res) => {
  const response = await daos.CarritoDao.getById(req.params.id)

  res.json(response)
})

router.delete("/carritos/:id", async (req, res) => {
  const response = await daos.CarritoDao.deleteById(req.params.id);

  res.json(response)
})

router.put("/carritos/:id", async (req, res) => {
  const response = await daos.CarritoDao.update(req.params.id, req.body);

  res.json(response)
})


router.post('/carritos', async (req, res) => {
  const response = await daos.CarritoDao.save(req.body)

  res.json(response)
})

export default router
