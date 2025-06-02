import express from 'express';
import { listadoAdministradores, listadoClientes, listadoHistorialDeAccesos, listadoProductos, listadoUsuarios, listadoVentas,listadoVentasPorId } from '../controladores/controladorDelAdministrador.js';

const rutas = express.Router();

rutas.get('/usuarios',listadoUsuarios);

rutas.get('/clientes',listadoClientes);

rutas.get('/administradores',listadoAdministradores);

rutas.get('/productos',listadoProductos);

rutas.get('/ventas',listadoVentas);
rutas.get('/ventas/:idCliente',listadoVentasPorId);

rutas.get('/historial',listadoHistorialDeAccesos);

export default rutas;