import { Router } from "express";
import bcrypt from 'bcrypt';
import { UserModel } from "../models/user.model.js";


const router = Router();


// CREAR usuario

router.post('register', async (req, res)=>{
    const { first_name, last_name, email, age, password, role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword,
        role
    })
    try{
        await UserModel.create(user);
        res.status(201).json({message: 'El usuario fue creado con exito'});
    }
    catch(error){
        res.status(400).json({message: 'Error al crear el usuario', error});
    }
})

export default router;