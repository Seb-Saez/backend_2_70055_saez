import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import { __dirname } from './utils.js';
import userRouter from './routes/users.route.js';
import dotenv from 'dotenv';
import productRouter from './routes/products.route.js';
import cartRouter from './routes/cart.router.js';

// config de variables de entorno
dotenv.config();
const PORT = process.env.PORT || 3030;


const app = express();

// congi json
app.use(express.json());

// ROUTES
app.use('/api/sessions', userRouter )
app.use('/api', productRouter);
app.use('/api', cartRouter);



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