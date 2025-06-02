import pool from  '../configuracion/bd.js';

// INICIO DE LOS DESPLIEGUES
export const mostrarUsuario = async () =>{
    const [resultado] = await pool.query("SELECT * FROM usuario")
    return resultado;
}

export const mostrarProducto = async () =>{
    const [resultado] = await pool.query("SELECT * FROM PRODUCTO")
    return resultado;
}


export const mostrarClientes = async () => {
    const [resultado] = await pool.query("SELECT xc.idCliente,xu.nombreDeUsuario,xc.saldo_pendiente FROM usuario xu JOIN cliente xc ON xu.idUsuario = xc.idCliente")
    return resultado;
}

export const mostrarHistorialDeAcceso = async () =>{
    const [resultado] = await pool.query("SELECT xh.idLogin, xh.direccion_ip, xh.evento, xh.navegador, xu.nombreDeUsuario FROM usuario xu JOIN historial_acceso xh ON xh.idUsuario = xu.idUsuario")
    return resultado;
}

export const mostrarVenta = async () => {
    const [resultado] = await pool.query("SELECT * FROM compra_a_credito")
    return resultado;
}

export const mostrarVentaPorId = async (idCliente) =>{
    const [resultado] = await pool.query("SELECT * FROM compra_a_credito WHERE idCliente = ?",[idCliente]);
    return resultado;
}

export const mostrarAdministrador = async () => {
    const [resultado] = await pool.query("SELECT * FROM administrador")
    return resultado;
}

// INICIO DE LAS INSERCIONES

export const insertarUsuario = async(nombreDeUsuario, nombre, paterno, materno,f_nacimiento, correo, telefono, contrasenia, sexo, estado, tipo) => {
    await pool.query("INSERT INTO usuario (nombreDeUsuario, nombre, paterno, materno,f_nacimiento, correo, telefono, contrasenia, sexo, estado, tipo) VALUES (?,?,?,?,?,?,?,?,?,?,?)",[nombreDeUsuario, nombre, paterno, materno,f_nacimiento, correo, telefono, contrasenia, sexo, estado, tipo])
}

export const insertarCliente = async (saldo_pendiente) => {
    await pool.query("INSERT INTO cliente (saldo_cliente) VALUES (?)",[saldo_pendiente]);
}

export const insertarAdministrador = async (nomAdmin) => {
    await pool.query("INSERT INTO administrador(nomAdmin) VALUES (?)",[nomAdmin])
} 

export const insertarProducto = async (nomProducto, descripcion, cantidad, precio, categoria, idAdmin) => {//no es necesario poner la fecha se pone automáticamente 
    await pool.query("INSERT INTO  producto (nomProducto, descripcion, cantidad, precio, categoria, idAdmin) VALUES (?,?,?,?,?,?)",[nomProducto, descripcion, cantidad, precio, categoria, idAdmin])
}

export const insertarVenta = async (cantidad, precio_unitario, monto_cancelado, observaciones, idCliente, idProducto, idAdmin) =>{
    await pool.query("INSERT INTO compra_a_credito (cantidad, precio_unitario, monto_cancelado, observaciones, idCliente, idProducto, idAdmin) VALUES (?,?,?,?,?,?,?)",[cantidad, precio_unitario, monto_cancelado, observaciones, idCliente, idProducto, idAdmin])
}

export const insertarHistorialDeAcceso = async(direccion_ip, evento, navegador, idUsuario)=>{
    await pool.query("INSERT INTO historial_acceso (direccion_ip, evento, navegador, idUsuario) VALUES (?,?,?,?)",[direccion_ip, evento, navegador, idUsuario]);
}

//INICIO DE LAS ACTUALIZACIONES

