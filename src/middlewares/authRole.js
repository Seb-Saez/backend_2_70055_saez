import jwt from 'jsonwebtoken';

export const authorizeRol = (requiredRole) => {
    return (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(403).json({ message: 'No se proporcionó un token' });
        }


        try {
            // Verificamos y decodificamos el token
            const decoded = jwt.verify(token, process.env.SECRET);
            console.log("Token decodificado:", decoded);       // Para ver los datos decodificados

            req.user = decoded;

            // Verificamos si el rol del usuario es el adecuado
            if (req.user.role !== requiredRole) {
                return res.status(403).json({ message: 'Acceso denegado' });
            }

            // Si el rol es el correcto, continuamos
            next();
        } catch (error) {
            console.log("Error al verificar el token:", error); 
            return res.status(401).json({ message: 'Su rol no pudo ser verificado con el token proporcionado' });
        }
    };
};

