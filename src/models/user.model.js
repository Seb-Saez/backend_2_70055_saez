import mongoose, { Schema, model } from "mongoose";


// Creacion del modelo del ticket


const userCollection = 'users';

const userSchema = new Schema({
    
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    age: Number,
    password: {
        type: String,
        required: true

    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: 'user'
    }
})

export const UserModel = mongoose.model( userCollection, userSchema)

