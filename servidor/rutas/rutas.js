import express from 'express';
import { actualizarAdministrador, actualizarProducto, actualizarUsuario, agregarProductos, eliminarProductos, eliminarUsuarios, listadoAdministradores, listadoClientes, listadoHistorialDeAccesos, listadoProductos, listadoUsuarios, listadoVentas,listadoVentasPorId } from '../controladores/controladorDelAdministrador.js';

const rutas = express.Router();

rutas.get('/usuarios',listadoUsuarios);
rutas.delete('/usuarios/:idUsuario',eliminarUsuarios);
rutas.put('/usuarios/:idUsuario',actualizarUsuario);

rutas.get('/clientes',listadoClientes);

rutas.get('/administradores',listadoAdministradores);
rutas.put('/administradores/:idAdmin',actualizarAdministrador)

rutas.get('/productos',listadoProductos);
rutas.put('/productos/:idProducto',actualizarProducto);
rutas.delete('/productos/:idProducto',eliminarProductos);
rutas.post('/productos/',agregarProductos);

rutas.get('/ventas',listadoVentas);
rutas.get('/ventas/:idCliente',listadoVentasPorId);

rutas.get('/historial',listadoHistorialDeAccesos);

export default rutas;