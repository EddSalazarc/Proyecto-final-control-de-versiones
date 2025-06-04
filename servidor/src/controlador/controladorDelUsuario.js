const ModeloDelUsuario = require('../modelo/modeloDelUsuario');
const bcrypt = require('bcrypt');

class ControladorDelUsuario {
    // Obtener datos del usuario
    static async obtenerDatosUsuario(req, res) {
        try {
            const { nombreDeUsuario } = req.params;
            
            // Primero obtenemos el ID del usuario
            const usuario = await ModeloDelUsuario.obtenerIdUsuarioPorNombre(nombreDeUsuario);
            if (!usuario) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }

            // Luego obtenemos todos los datos del usuario
            const datosUsuario = await ModeloDelUsuario.obtenerDatosUsuario(usuario.idUsuario);
            res.json(datosUsuario);
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    }

    // Actualizar datos del usuario
    static async actualizarDatosUsuario(req, res) {
        try {
            const { nombreDeUsuario } = req.params;
            const datosActualizados = req.body;

            // Primero obtenemos el ID del usuario
            const usuario = await ModeloDelUsuario.obtenerIdUsuarioPorNombre(nombreDeUsuario);
            if (!usuario) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }

            // Si se está actualizando la contraseña, la encriptamos
            if (datosActualizados.contrasenia) {
                const salt = await bcrypt.genSalt(10);
                datosActualizados.contrasenia = await bcrypt.hash(datosActualizados.contrasenia, salt);
            }

            // Actualizamos los datos
            await ModeloDelUsuario.actualizarDatosUsuario(usuario.idUsuario, datosActualizados);
            
            res.json({ mensaje: 'Datos actualizados correctamente' });
        } catch (error) {
            console.error('Error al actualizar datos del usuario:', error);
            res.status(500).json({ mensaje: 'Error interno del servidor' });
        }
    }
}

module.exports = ControladorDelUsuario; 