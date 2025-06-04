const conexion = require('../config/conexionBD');

class ModeloDelUsuario {
    // Obtener ID de usuario por nombreDeUsuario
    static async obtenerIdUsuarioPorNombre(nombreDeUsuario) {
        try {
            const [resultado] = await conexion.query(
                'SELECT idUsuario FROM USUARIO WHERE nombreDeUsuario = ?',
                [nombreDeUsuario]
            );
            return resultado[0];
        } catch (error) {
            throw error;
        }
    }

    // Obtener datos del usuario por ID
    static async obtenerDatosUsuario(idUsuario) {
        try {
            const [resultado] = await conexion.query(
                'SELECT nombreDeUsuario, nombre, paterno, materno, f_nacimiento, correo, telefono, sexo FROM USUARIO WHERE idUsuario = ?',
                [idUsuario]
            );
            return resultado[0];
        } catch (error) {
            throw error;
        }
    }

    // Actualizar datos del usuario
    static async actualizarDatosUsuario(idUsuario, datosActualizados) {
        try {
            const [resultado] = await conexion.query(
                `UPDATE USUARIO SET 
                    nombreDeUsuario = ?,
                    nombre = ?,
                    paterno = ?,
                    materno = ?,
                    f_nacimiento = ?,
                    correo = ?,
                    telefono = ?,
                    contrasenia = ?,
                    sexo = ?
                WHERE idUsuario = ?`,
                [
                    datosActualizados.nombreDeUsuario,
                    datosActualizados.nombre,
                    datosActualizados.paterno,
                    datosActualizados.materno,
                    datosActualizados.f_nacimiento,
                    datosActualizados.correo,
                    datosActualizados.telefono,
                    datosActualizados.contrasenia,
                    datosActualizados.sexo,
                    idUsuario
                ]
            );
            return resultado;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ModeloDelUsuario; 