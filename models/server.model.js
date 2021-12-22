const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server{

    constructor()
    {
        this.app = express()
        this.port = process.env.PORT

        // Para saber que rutas contiene el servidor
        // here we get the behind info
        this.usuariosPath = '/api/users'

        // JSON Web Token Autenticate Route
        this.authPath = '/api/auth'

        // Conectar a DB
        this.conectarDB()

        // Añadimos Middlewares : Funciones con las que añadimos otras funcionalidades a nuestro server
        this.middlewares()
        // Rutas de mi aplicacion
        this.routes()
    }

    async conectarDB() {
        // Aqui podriamos crear varias conexiones dependiendo si estamos en desarrolo o produccion
        await dbConnection()
    }

    // Middlewares, how your name say, it's bettwen request and result, in the middle
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
        // Ruta de autenticacion
        this.app.use(this.authPath , require('../routes/auth.routes'))
        // Mandamos traer las rutas
        this.app.use(this.usuariosPath , require('../routes/user.routes'))
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Server running at port', this.port);
        })
    }
}

module.exports = Server