import jwt from 'jsonwebtoken';


// middle para verificar el rol del user

export const authorizeRol = (requiredRole) => {
    return (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).json({ message: 'No se proporcionó un token' });
        }
        try {
            // Verificamos y decodificamos el token
            const decoded = jwt.verify(token, process.env.SECRET);
            req.user = decoded;

            // Verificamos si el rol del usuario es el adecuado
            if (req.user.role !== requiredRole) {
                return res.status(403).json({ message: 'Acceso denegado' });
            }

            // Si el rol es el correcto, continuamos
            next();

        } catch (error) {
            return res.status(401).json({ message: 'Token no válido o expirado' });

        }
        };
}

