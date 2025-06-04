import * as registroAdministrador from '../modelos/modeloDelAdministrador.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = 'tu_clave_secreta_muy_segura'; // En producción, esto debería estar en variables de entorno

export const login = async (req, res) => {
    try {
        const { nombreDeUsuario, contrasenia } = req.body;

        // Buscar el usuario en la base de datos
        const usuarios = await registroAdministrador.mostrarUsuario();
        const usuario = usuarios.find(u => u.nombreDeUsuario === nombreDeUsuario);

        if (!usuario) {
            return res.status(401).json({ 
                message: 'Usuario o contraseña incorrectos'
            });
        }

        // Por ahora, comparación directa de contraseñas
        // TODO: Implementar hash de contraseñas con bcrypt
        if (contrasenia !== usuario.contrasenia) {
            return res.status(401).json({ 
                message: 'Usuario o contraseña incorrectos'
            });
        }

        // Generar token JWT
        const token = jwt.sign(
            { 
                id: usuario.idUsuario,
                tipo: usuario.tipo 
            },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        // Registrar el acceso en el historial
        const direccion_ip = req.ip;
        const evento = 'ingreso';
        const navegador = req.headers['user-agent'];
        await registroAdministrador.insertarHistorialDeAcceso(
            direccion_ip,
            evento,
            navegador,
            usuario.idUsuario
        );

        res.status(200).json({
            token,
            tipo: usuario.tipo,
            mensaje: 'Inicio de sesión exitoso'
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            message: 'Error durante el inicio de sesión',
            error: error.message
        });
    }
};

export const logout = async (req, res) => {
    try {
        // Obtener el ID del usuario del token
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Token no proporcionado' });
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        const idUsuario = decoded.id;

        // Registrar el cierre de sesión en el historial
        const direccion_ip = req.ip;
        const evento = 'salida';
        const navegador = req.headers['user-agent'];
        await registroAdministrador.insertarHistorialDeAcceso(
            direccion_ip,
            evento,
            navegador,
            idUsuario
        );

        res.status(200).json({
            mensaje: 'Sesión cerrada exitosamente'
        });
    } catch (error) {
        console.error('Error en logout:', error);
        res.status(500).json({
            message: 'Error durante el cierre de sesión',
            error: error.message
        });
    }
};

export const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.usuario = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
}; 