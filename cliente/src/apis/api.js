// AQUÍ VAMOS A RECIBIR LOS DATOS DEL BACKEND
import axios from 'axios'; 

const apiUsuarios='http://localhost:3000/api/usuarios';

export const listadoUsuarios = async () => {
    try{
        const respuesta = await axios.get(apiUsuarios);
        return respuesta.data;
    }catch(error){
        console.error(error);
    }
}

export const eliminarUsuarios = async (idUsuario) => {
    try{
        await axios.delete(`${apiUsuarios}/${idUsuario}`);
    }catch(error){
        console.error(error);
        throw error;
    }
}

export const actualizarUsuario = async (usuario) =>{
    try{
        const respuesta = await axios.put(`${apiUsuarios}/${usuario.idUsuario}`,usuario);
        return respuesta.data;
    }catch(error){
        console.error(error);
    }
}

const apiClientes='http://localhost:3000/api/clientes';
export const listadoClientes = async () => {
    try{
        const respuesta = await axios.get(apiClientes);
        return respuesta.data;
    }catch(error){
        console.error(error);
    }
}



const apiProductos='http://localhost:3000/api/productos';
export const listadoProductos = async () => {
    try{
        const respuesta = await axios.get(apiProductos);
        return respuesta.data;
    }catch(error){
        console.error(error);
    }
}
export const actualizarProductos = async (producto) =>{
    try{
        const respuesta = await axios.put(`${apiProductos}/${producto.idProducto}`,producto);
        return respuesta.data;
    }catch(error){
        console.error(error);
    }
}
export const eliminarProductos = async (idProducto) => {
    try{
        await axios.delete(`${apiProductos}/${idProducto}`);
    }catch(error){
        console.error(error);
        throw error;
    }
}
export const agregarProductos = async (producto) =>{
    try{
        const respuesta = await axios.post(apiProductos,producto);
        console.log(respuesta);
        return respuesta.data;
    }catch(error){
        console.error(error);
    }
}


const apiHistorialAcceso='http://localhost:3000/api/historial';
export const listadoHistoriales = async () => {
    try{
        const respuesta = await axios.get(apiHistorialAcceso);
        return respuesta.data;
    }catch(error){
        console.error(error);
    }
}

const apiVentas='http://localhost:3000/api/ventas';
export const listadoVentas = async () => {
    try{
        const respuesta = await axios.get(apiVentas);
        return respuesta.data;
    }catch(error){
        console.error(error);
    }
}


const apiVentasPorId='http://localhost:3000/api/ventas';
export const listadoVentasPorId = async (idCliente) =>{
    try{
        const respuesta = await axios.get(`${apiVentasPorId}/${idCliente}`)
        return respuesta.data;
    }catch(error){
        console.error("error en el api:",error);
        throw error;
    }
}

const apiAdministradores='http://localhost:3000/api/administradores';
export const listadoAdministradores = async () => {
    try{
        const respuesta = await axios.get(apiAdministradores);
        return respuesta.data;
    }catch(error){
        console.error(error);
    }
}
export const actualizarAdministrador = async (administrador) =>{
    try{
        const respuesta = await axios.put(`${apiAdministradores}/${administrador.idAdmin}`,administrador);
        return respuesta.data;
    }catch(error){
        console.error(error);
    }
}