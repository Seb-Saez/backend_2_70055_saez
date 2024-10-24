import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

// Comentado como estaba antes


// export const createHash = (pass) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10));

// export const isValidPassword = (user, pass) => bcrypt.compareSync(pass,user.password);

const __filename = fileURLToPath(import.meta.url);

export const __dirname = dirname(__filename);


// export const generadorToken = (user) => {
    
//     const token = jwt.sign(user.toObject(), process.env.SECRET, { expiresIn: '24h' });
//     return token
// }


// export const decodeToken = (req, res, next) => {
//     const token = req.headers.authorization
//     console.log(token)
//     if(!token) res.status(400).json({message: 'Error al obtener el token'});
//     jwt.verify(token, process.env.SECRET, (err, userDecoded) => {
//         if(err) res.status(400).json({message: 'Token invalido'})
//             console.log(userDecoded)
//         req.user = userDecoded.user;
//         next()
//     })
// }



// Hasta aca era lo que tenia antes, ahora vamos con lo nuevo


// Función para generar un token JWT
export const generadorToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
      email: user.email
    },
    process.env.SECRET, // Secreto para firmar el token
    { expiresIn: '1h' } // El token expirará en 1 hora
  );
};




