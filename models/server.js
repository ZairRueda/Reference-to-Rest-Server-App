const express = require('express')
const cors = require('cors')

class Server{

    constructor()
    {
        this.app = express()
        this.port = process.env.PORT

        // Para saber que rutas contiene el servidor
        this.usuariosPath = '/api/usuarios'

        // Añadimos Middlewares : Funciones con las que añadimos otras funcionalidades a nuestro server
        this.middlewares()
        // Rutas de mi aplicacion
        this.routes()
    }

    middlewares() {
        // Identifiacamos los middlewares por el .use
        
        // CORS
        this.app.use(cors())

        // Cuando queramos traer algo por Post en formato Json
        // Parsaeo y Lectura del body > express.json() > parseara todo lo que este trabajando
        this.app.use(express.json())

        // Directorio plublico
        // .use > asi identificamos que estamos usando un middelware
        this.app.use(express.static('public'))
    }

    // Rutas del sistema
    routes(){
        // Mandamos traer las rutas
        this.app.use(this.usuariosPath , require('../routes/user.routes'))
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor Corriendo en puerto', this.port);
        })
    }
}

module.exports = Server