"user strict";

require("dotenv").config();
require("./lib/mongooseConection");

const { Producto, User } = require("./models");

console.log(Producto)
const productData = require("./products.json");

const dbConection = require("./lib/mongooseConection");

main().catch((err) => console.log("hubo un error: ", err));

async function main() {
  await initProductos();
  await initUsers();
  dbConection.close();
}

async function initProductos() {
  //Borrar todos los documentos de la colección productos
  const deleted = await Producto.deleteMany();
  console.log(`Elmiminados ${deleted.deletedCount} productos.`);

  //crear productos iniciales
  console.log(productData);
  const productos = await Producto.insertMany(productData.productos);
  console.log(productos);
}

async function initUsers() {
  const { deletedCount } = await User.deleteMany();
  console.log(`Eliminados ${deletedCount} usuarios.`);

  const result = await User.insertMany([
    {
      email: "admin@example.com",
      password: await User.hashPassword("1234"),
    },
    {
      email: "user1@example.com",
      password: await User.hashPassword("1234"),
    },
  ]);
  console.log(`Insertados ${result.length} usuarios.`);
}
