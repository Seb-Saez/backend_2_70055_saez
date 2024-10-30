import mongoose from 'mongoose';
import dotenv from 'dotenv';


dotenv.config();


export default class MongoSingleton {
    static #instance;

    constructor() {
        mongoose.connect(process.env.MONGO_URI, { dbName: 'coderBackend_2' })
            .then(() => { console.log('BBDD connectada!') })
            .catch(() => {
                console.log('Error al conectarse a la bbdd')
            })
    }

    static getInstance() {
        if(this.#instance){
            console.log('Existia una instancia previamente creada');
            return this.#instance
        } else{
            this.#instance = new MongoSingleton();
            console.log('Se crea una nueva instancia');
            return this.#instance
            
        }
    }

}


MongoSingleton.getInstance();






