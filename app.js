// Librerias
require('dotenv').config();

// Mis requerimientos
const Server = require('./models/server.model')

const server = new Server()

server.listen()
