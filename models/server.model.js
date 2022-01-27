const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server{

    constructor()
    {
        this.app = express()
        this.port = process.env.PORT

        // Antes teniamos un Path por ruta, pero si queremos escalar
        // se nos llenaria de rutas, solucion - crear un objeto
        this.paths = {
            auth: '/api/auth', // JSON Web Token Autenticate Route
            users: '/api/users', // Para saber que rutas contiene el servidor - here we get the behind info
            categories: '/api/categories',
            products: '/api/products'
        }

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
        // Routs about Autentication
        this.app.use(this.paths.auth , require('../routes/auth.routes'))
        // Routs about User
        this.app.use(this.paths.users , require('../routes/user.routes'))
        // Routs about Category
        this.app.use(this.paths.categories , require('../routes/categories.routes'))
        // Routs about Product
        this.app.use(this.paths.products , require('../routes/products.routes'))
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Server is running at port', this.port);
        })
    }
}

module.exports = Server