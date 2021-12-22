# REST Server 

## Intall

> npm install

## After Install (Start)

> node app

If you want your app stay alive install Nodemon

> npm install -g nodemon

like this you can see the bugs

### Data

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
* JsonWebToken : nos servira para la crear tokens

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

* Variables de entorno en servidor 

Por motivos de seguridad las variables de entorno del servidor no se guardan para 
eso se crean en el mismo config de heroku

### Pasos

Para saber las variables de entorno que existen 

` heroku config `

agregar variable de entorno

` heroku config:set ejemplo="valorVariable" `

obtener valor

` heroku config:get ejemplo `

borrar variable de entorno

` heroku config:unset ejemplo `

## User Interface With Json Web Token

1. To act as save the info of user, but its not for save sensitive information

## Ways of used

1. Session user
    * Pero realentizaria el servidor
    * Para optimizar esas variables se usan los Json web Tokens 
        * este incluye header, payload, y la firma
2. Validate Session 
    * This way require a end date, and more hash data 

## Notas

* Backend 
    Los usuarios ya no se eliminan el de las bases de datos, por que dicho pudo a 
    haber creado instancias necesarias

* Request in the functions
    Es una instancia que podemos ir modificando con forme se va ejecutando la ruta, si enn una funcion superior 
    le agregamos algo en una funcion inferior lo podemos mandar traer