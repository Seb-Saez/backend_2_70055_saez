import { Router } from "express";
import bcrypt from 'bcrypt';
import { UserModel } from "../models/user.model.js";
import { generadorToken } from "../utils.js";
import { verifyToken } from "../middlewares/verifyToken.js";



const router = Router();

// REGISTER:  crear usuario con register

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, age, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword,
        role
    });
    
    try {
        await UserModel.create(user);
        res.status(201).json({
            message: 'El usuario fue creado con éxito',
            user: {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                age: user.age,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el usuario', error });
    }
});

// LOGIN:  login del ususario creado y generacion de token

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'El usuario no existe' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'La contraseña es incorrecta' });
        }

        const token = generadorToken(user); // Generar el token

        res.json({
            message: 'Login exitoso',
            token,
            user: {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                age: user.age,
                role: user.role
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

// currwent

router.get('/current', verifyToken , (req, res) => {
    res.json({
        message: 'Acceso permitido',
        user: req.user
    });
});



export default router;