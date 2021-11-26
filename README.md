# REST Server 

* En este proyecto analizaremos a profundidad el rest server 
* Crear estructuras que pocibiliten el crecimineto del producto

* Estareamos creando modelos, vistas y controladores

### Tipos de peticiones HTTP

* GET
* PUT
* POST 
* DELETE
* PATCH

## Paquetes

* Dotenv : control de variables de entorno
* Express : Control de servidores
* Cors : Proteccion para el servidor de una manera superficial (relativamente )
* Mongoose : es un ODM (Object Data Modeling) Un modelador de los objetos de la DB
    * Es muy usado para evitar injection of sql, limpiar comandos etc
* bcryptjs : para encriptacion de contraseñas
* express-validator : validaremos con esto el email

## Carpetas

1. Public 
    * La vista que se mostrara al usuario
2. routes
    * Las rutas de la aplicacion
3. controllers 
    * Los controladores de las rutas
4. Modules 
    * Los modulos para cada ruta

## Info Relevanete 

Estamos conectando nuestro proyecto a una base de datos MongoDB
En este proyecto crearemos un modelo de una coleccione