'use strict';

const mongoose = require('mongoose');

//En caso de error en la conexión de la Base de datos
mongoose.connection.on('error', err => {
    console.log('Error de Conexión', err);
    process.exit(1);
});

//Abrimos la base de datos
mongoose.connection.once('open', () =>{
    console.log('Conexión realizada en: ', mongoose.connection.name);
});

//Contectamos con la base de datos
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {});

module.exports = mongoose.connection