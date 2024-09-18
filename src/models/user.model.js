import mongoose, { Schema, model } from "mongoose";


const userCollection = 'users';

const userSchema = new Schema({
    
    first_name: String,
    last_name: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
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

