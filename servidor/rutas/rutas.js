import express from 'express';
import { actualizarAdministrador, actualizarProducto, actualizarUsuario, agregarClientes, agregarProductos, eliminarProductos, eliminarUsuarios, listadoAdministradores, listadoClientes, listadoHistorialDeAccesos, listadoIdUsuarios, listadoProductos, listadoUsuarios, listadoVentas, listadoVentasPorId } from '../controladores/controladorDelAdministrador.js';
import { login, logout, verificarToken } from '../controladores/authController.js';

const rutas = express.Router();

// Rutas de autenticación
rutas.post('/auth/login', login);
rutas.post('/auth/logout', verificarToken, logout);

// Rutas protegidas que requieren autenticación
rutas.use('/usuarios', verificarToken);
rutas.use('/administradores', verificarToken);
rutas.use('/productos', verificarToken);
rutas.use('/ventas', verificarToken);
rutas.use('/historial', verificarToken);

// Rutas existentes
rutas.get('/usuarios', listadoUsuarios);
rutas.get('/usuarios/:nombreDeUsuario/id',listadoIdUsuarios);
rutas.delete('/usuarios/:idUsuario', eliminarUsuarios);
rutas.put('/usuarios/:idUsuario', actualizarUsuario);

rutas.get('/clientes', listadoClientes);
rutas.post('/clientes', agregarClientes);

rutas.get('/administradores', listadoAdministradores);
rutas.put('/administradores/:idAdmin', actualizarAdministrador);

rutas.get('/productos', listadoProductos);
rutas.put('/productos/:idProducto', actualizarProducto);
rutas.delete('/productos/:idProducto', eliminarProductos);
rutas.post('/productos/', agregarProductos);

rutas.get('/ventas', listadoVentas);
rutas.get('/ventas/:idCliente', listadoVentasPorId);

rutas.get('/historial', listadoHistorialDeAccesos);

export default rutas;