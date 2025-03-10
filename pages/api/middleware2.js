import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

export function authMiddlewareNEXTBACK2(handler) {
  return async (req, res) => {
    try {
      // Verificar el método si es necesario
      if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método no permitido' });
      }

      // Extraer el token desde las cookies o el header Authorization
      const cookies = parse(req.headers.cookie || '');
      const token = cookies.token || req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado o inválido' });
      }

      // Verificar el token
      const decoded = jwt.verify(token, process.env.NEXT_JWT_SECRET_KEY);
      
      // Agregar el usuario decodificado al request para usarlo en la ruta
      req.user = decoded;

      // Llamar al handler original y pasarle los mismos parámetros
      return handler(req, res);
    } catch {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }
  };
}
