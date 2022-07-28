import config from "./config.js";
import mongoose from "mongoose";

await mongoose.connect(config.mongodb.connectionString);

class ContenedorMongo {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  async getById(id) {
    try {
      const doc = await this.collection.findById(id, { __v: 0 })
      return doc
    } catch (error) {
      return console.log(error)
    }
  }

  async getAll() {
    try {
      const docs = await this.collection.find({}, { __v: 0 })
      return docs
    } catch (error) {
      return console.log(error)
    }
  }

  async save(objeto) {
    try {
      objeto.timestamp = new Date()
      const nuevoObjeto = await this.collection.insertMany(objeto)
      return console.log(`Objeto guardado correctamente: ${nuevoObjeto}`)
    } catch (error) {
      return console.log(error)
    }
  }

  async update(id, product) {
  try {
    await this.collection.updateOne({ '_id': id }, product)
    return console.log("Producto actualizado")
  } catch (error) {
    return console.log(error)
  }
}

  async deleteById(id) {
  try {

    await this.collection.deleteOne({ '_id': id })

    return console.log("Producto eliminado")
  } catch (error) {
    return console.log(error)
  }
}

}

export default ContenedorMongo;
