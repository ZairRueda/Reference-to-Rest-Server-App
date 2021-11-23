// Librerias
require('dotenv').config();

// Mis requerminetos
const Server = require('./models/server')

const server = new Server()

server.listen()


/* Migrando a Objetos

const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
// app.listen( process.env.PORT )

// En caso de revizar un error en el puerto
app.listen( process.env.PORT, () => {
    console.log('Servidor Corriendo en puerto', process.env.PORT);
})
*/