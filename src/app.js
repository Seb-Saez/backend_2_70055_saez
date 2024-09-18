import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import { __dirname } from './utils.js';
import userRouter from './routes/users.route.js';
import dotenv from 'dotenv';

// config de variables de entorno
dotenv.config();


const app = express();
const PORT = 8080 || 3030;

// congi json
app.use(express.json());
app.use

// ROUTES
app.use('/api/sessions', userRouter )




// conectar BBDD mongo
mongoose.connect(process.env.MONGO_URI, {dbName: 'coderBackend_2'})
    .then(() => { console.log('BBDD connectada!')})
.catch(() => {
    console.log('Error al conectarse a la bbdd')
})



// levantar server
app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto '+ PORT);
});