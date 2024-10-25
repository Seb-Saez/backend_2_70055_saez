Instrucciones para el funcionamiento:



► Registrar/ crear un usuario:

En insomnia hacer una request de tipo POST a http://localhost:8080/api/sessions/register

Con el sgte formato json en body:

{
    "first_name": "nombre",
    "last_name": "epellido",
    "email": "mail@gmail.com",
    "age": 30,
    "password": "contraseña",
    "role": "user o admin"    // importante solo user o admin de otra manera no funcionara
}



► Login: 

En insomnia hacer una request de tipo GET a http://localhost:8080/api/sessions/login

Con el sgte formato json en body:

{
    "email": "mail@gmail.com",
    "password": "contraseña",
}

* el mail y la contraseña deben ser correctos, puede registrar uno nuevo o usar la siguiente plantilla;

{
    "first_name": "Juan",
    "last_name": "Perez",
    "email": "juan.perez@gmail.com",
    "age": 30,
    "password": "juan1234",
    "role": "user"
}



► Current:

Hacer una request tipo GET a la ruta    http://localhost:8080/api/sessions/current

Y por header enviar:

Authorization Bearer (token que nos devuelve en login)




█ Creacion de productos:



► Creacion de un producto:

POST   a  http://localhost:8080/api/products

json en body:

{
  "name": "Producto 1",
  "price": 100,
  "stock": 50
}


y ademas enviar el token de administrador que debemos obtener al crear un usuario con rol admin y hacer un login

header:

 - Authorization Bearer (token que nos devuelve en login)
 - Content-Type application/json       ** sin esto no funciona


► Actualizar un producto:

PUT   a  http://localhost:8080/api/products/:pid

json en body:

{
  "name": "Producto1 actualizado",
  "price": 125,
  "stock": 30
}



y ademas enviar el token de administrador que debemos obtener al crear un usuario con rol admin y hacer un login

header:

Authorization Bearer (token que nos devuelve en login)



► Eliminar un producto

PUT   a  http://localhost:8080/api/products/:pid



y ademas enviar el token de administrador que debemos obtener al crear un usuario con rol admin y hacer un login

header:

Authorization Bearer (token que nos devuelve en login)



█ Carritos

►  Crear un carrito

POST   a  http://localhost:8080/api/cart


y ademas enviar el token de administrador que debemos obtener al crear un usuario con rol admin y hacer un login

header:

Authorization Bearer (token que nos devuelve en login)

► Obtener la informacion de un carrito por id

GET a http://localhost:8080/api/cart/:cid



► Agregar un producto al carrito


POST a http://localhost:8080/api/cart/cid/products/:pid

header:

 - Content-Type application/json




► Realizar la compra y generar el ticket

POST a http://localhost:8080/api/cart/:cid/purchase


header: 

Authorization Bearer (token que nos devuelve en login)


