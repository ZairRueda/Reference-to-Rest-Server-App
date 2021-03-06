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

### Mas de Heroku

Si queremos ver los impreciones en consola o los logs de heroku por cantida ejem ultimos 100

` heroku logs -n 100 `

Si los queremos en tiempo real

` heroku logs -n 100 --tail ` 

## User Interface With Json Web Token

1. To act as save the info of user, but its not for save sensitive information

## Ways of used

1. Session user
    * Pero realentizaria el servidor
    * Para optimizar esas variables se usan los Json web Tokens 
        * este incluye header, payload, y la firma
2. Validate Session 
    * This way require a end date, and more hash data 

## SignIn Google (Registro con Google)

* El procedimiento para integrar un sign in es igual en cualquier servicio que lo permita (facebook, twitter etc)

Instalamos el packete necesario

`npm install google-auth-library --save`

Seguimos las instrucciones de uso 
* todos funcionan a vace a una promesa , usamos fetch, y son divididos entre la intregracion de frontend y la del backend

1. FrontEnd 
    * Contiene el fetch, este es enviado por medio de POST
2. BackEnd 
    * Hacemos las comprobaciones del Id_token
    * Lo pasamos al controlador y hacemos la verificacion del token con los servidores de google
    * Organizamos la informacion si es necesario para que encaje con nuestra bace de datos 
    * Comparamos la info con nuestra bace de datos

## Categories Integration - Notas

* Si se asocia a un usuario  (o un modelo) con otro modelo, este tiene que ser tipo Schema.Types.ObjectId 

## Busqueda 

* La busqueda con MongoDB es muy parecida a otras bases de datos se le pasan ciertos parametros que debe de cumplir la busqueda deseada
* Para hacer una busqueda sensoble podemos ayudarnos con una funcion de node `cosnt regex = new RegExp(param, 'i') `
* Podemos añadir a los requerimentos de busqueda mas parametros para que el buscador revice por categoria 

### Operadores logicos - Busquedas Especificas

* Mongo cuenta con operadores logicos que facilitan la integracion de una busqueda
    * $and
    * $not
    * $nor
    * $or
* [Mas informacion de optros operadores](https://docs.mongodb.com/manual/reference/operator/query/)

## Subida de archivos 

* Usamos una libreria de express llamada [fileUpload](https://www.npmjs.com/package/express-fileupload)

## Guardado de Imagenes

* Es usual que al guardar imagenes usemos un servidor aparte para mejor performanse y evitar posibles fallas
* Para esto usaremos Claudinary, haciendo uso de su API y su libreria
` npm i cloudinary `

## Notas

* Backend 
    Los usuarios ya no se eliminan el de las bases de datos, por que dicho pudo a 
    haber creado instancias necesarias

* Request in the functions
    Es una instancia que podemos ir modificando con forme se va ejecutando la ruta, si enn una funcion superior 
    le agregamos algo en una funcion inferior lo podemos mandar traer

* Parametros que resive una funcion
    En el caso de las funciones en las rutas siempre resiven (req = requerimientos, res = la respuesta del servidor)
    Pero tambien existe Next, este es mayormente usado en los Middlewares este nos sirve para dar continuidad a el ciclo de ejecucion
    Los Middlewares siempre den recivir (req, res, next)