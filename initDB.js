'user strict';

const dbConection = require('./lib/mongooseConection');

const Producto = require('./models/Product')
const productData = require('./products.json')

main().catch(err => console.log('hubo un error: ', err));

async function main() {
    await initProductos();
    dbConection.close();
}

async function initProductos() {
    //Borrar todos los documentos de la colección productos
    const deleted = await Producto.deleteMany();
    console.log(`Elmiminados ${deleted.deletedCount} productos.`);

    //crear productos iniciales
    console.log(productData)
    const productos = await Producto.insertMany(productData.productos)
    console.log(productos)
}