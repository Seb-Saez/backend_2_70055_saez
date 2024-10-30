import jwt from 'jsonwebtoken';


// middleware para verificar el token enviado por headers
export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  // si no viene un token
  if (!token) {
    return res.status(403).json({ message: 'No se proporcionó un token' });
  }
// si viene un token intentar validarlo
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token no válido o expirado' });
  }
};
