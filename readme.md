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

En insomnia hacer una request de tipo GET a http://localhost:8080/api/sessions/current

Con el sgte formato json en body:

{
    "email": "mail@gmail.com",
    "password": "contraseña",
}

* el mail y la contraseña deben ser correctos, puede registrar uno nuevo o usar la siguiente plantilla;

{
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan.perez@gmail.com",
    "age": 30,
    "password": "juan1234",
    "role": "user"
}