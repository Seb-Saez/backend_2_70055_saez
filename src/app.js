import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import { __dirname } from './utils.js';
import userRouter from './routes/users.route.js';
import dotenv from 'dotenv';
import productRouter from './routes/products.route.js';
import cartRouter from './routes/cart.router.js';
import MongoSingleton from './mongo/mongo.conection.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './middlewares/swagger.js';

// config de variables de entorno
dotenv.config();
const PORT = process.env.PORT || 3030;


const app = express();

// conifg json
app.use(express.json());

// config swagger
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// ROUTES
app.use('/api/sessions', userRouter )
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);


// levantar server
app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto '+ PORT);
});