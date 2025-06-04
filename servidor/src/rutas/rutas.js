const ControladorDelUsuario = require('../controlador/controladorDelUsuario');

// Rutas para la configuración de usuario
router.get('/usuario/:nombreDeUsuario', ControladorDelUsuario.obtenerDatosUsuario);
router.put('/usuario/:nombreDeUsuario', ControladorDelUsuario.actualizarDatosUsuario);

module.exports = router; 