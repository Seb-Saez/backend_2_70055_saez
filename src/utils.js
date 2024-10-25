import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);

// Función para generar un token JWT
export const generadorToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email
    },
    process.env.SECRET, // clave para firmar el token
    { expiresIn: '24h' } 
  );
};




