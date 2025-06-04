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
    const [resultado] = await pool.query("SELECT xh.idLogin, xh.direccion_ip, xh.evento, xh.navegador,xh.fecha, xu.nombreDeUsuario FROM usuario xu JOIN historial_acceso xh ON xh.idUsuario = xu.idUsuario")
    return resultado;
}

export const mostrarVenta = async () => {
    const [resultado] = await pool.query("SELECT * FROM compra_a_credito")
    return resultado;
}

export const mostrarVentaPorId = async (idCliente) =>{
    const [resultado] = await pool.query("SELECT xc.idCompra,xc.fecha,xp.nomProducto,xp.descripcion,xc.cantidad,xc.precio_unitario,xc.monto_cancelado,xc.observaciones FROM compra_a_credito xc JOIN producto xp ON xc.idProducto=xp.idProducto and xc.idCliente=?",[idCliente]);
    return resultado;
}

export const mostrarIdUsuario = async (nombreDeUsuario) =>{
    const [resultado] = await pool.query("SELECT idUsuario FROM usuario WHERE nombreDeUsuario = ?",[nombreDeUsuario]);
    return resultado;
}

export const mostrarAdministrador = async () => {
    const [resultado] = await pool.query("SELECT xa.idAdmin,xa.nomAdmin,xu.nombre,xu.paterno,xu.materno,xu.f_nacimiento,xu.correo,xu.telefono,xu.contrasenia,xu.sexo,xu.f_registro,xu.estado,xu.tipo FROM administrador xa JOIN usuario xu ON xa.idAdmin = xu.idUsuario")
    return resultado;
}

// INICIO DE LAS INSERCIONES

export const insertarUsuario = async(nombreDeUsuario, nombre, paterno, materno,f_nacimiento, correo, telefono, contrasenia, sexo, estado, tipo) => {
 const [resultado] =await pool.query("INSERT INTO usuario (nombreDeUsuario, nombre, paterno, materno,f_nacimiento, correo, telefono, contrasenia, sexo, estado, tipo) VALUES (?,?,?,?,?,?,?,?,?,?,?)",[nombreDeUsuario, nombre, paterno, materno,f_nacimiento, correo, telefono, contrasenia, sexo, estado, tipo])
 return resultado;    
}

export const insertarCliente = async (saldo_pendiente) => {
 const [resultado] = await pool.query("INSERT INTO cliente (saldo_cliente) VALUES (?)",[saldo_pendiente]);
 return resultado;    

}

export const insertarAdministrador = async (nomAdmin) => {
 const [resultado] = await pool.query("INSERT INTO administrador(nomAdmin) VALUES (?)",[nomAdmin]);
 return resultado;   
 
} 

export const insertarProducto = async (nomProducto, descripcion, cantidad, precio, categoria, idAdmin) => {//no es necesario poner la fecha se pone automáticamente 
 const [resultado] =await pool.query("INSERT INTO  producto (nomProducto, descripcion, cantidad, precio, categoria, idAdmin) VALUES (?,?,?,?,?,?)",[nomProducto, descripcion, cantidad, precio, categoria, idAdmin]);
 return resultado;    
}

export const insertarVenta = async (cantidad, precio_unitario, monto_cancelado, observaciones, idCliente, idProducto, idAdmin) =>{
 const [resultado] =await pool.query("INSERT INTO compra_a_credito (cantidad, precio_unitario, monto_cancelado, observaciones, idCliente, idProducto, idAdmin) VALUES (?,?,?,?,?,?,?)",[cantidad, precio_unitario, monto_cancelado, observaciones, idCliente, idProducto, idAdmin]);
 return resultado;    
}

export const insertarHistorialDeAcceso = async(direccion_ip, evento, navegador, idUsuario)=>{
    const [resultado] =await pool.query("INSERT INTO historial_acceso (direccion_ip, evento, navegador, idUsuario) VALUES (?,?,?,?)",[direccion_ip, evento, navegador, idUsuario]);
    return resultado;
}

//INICIO DE LOS ELIMINARES 

export const eliminarUsuario = async(idUsuario) => {
 const [resultado] = await pool.query("DELETE FROM usuario WHERE idUsuario = ?",[idUsuario]);
 return resultado;
     
}

export const eliminarProduto = async(idProducto) => {
 const [resultado] = await pool.query("DELETE FROM producto WHERE idProducto = ?",[idProducto]);
 return resultado;
     
}

//INICIO DE LAS ACTUALIZACIONES

export const editarProducto = async (nomProducto, descripcion, cantidad , precio, categoria, idAdmin,idProducto) =>{
    const [resultado] = await pool.query("UPDATE producto  SET  nomProducto=?, descripcion=?, cantidad =?, precio=?, categoria=?, idAdmin=? WHERE idProducto=?",[nomProducto, descripcion, cantidad , precio, categoria, idAdmin,idProducto])
    return resultado;
}

export const editarAdministrador = async (nomAdmin,idAdmin)=>{
    const [resultado] = await pool.query("UPDATE administrador SET nomAdmin = ? WHERE idAdmin=?",[nomAdmin,idAdmin]);
    return resultado;
}

export const editarUsuario = async (nombreDeUsuario, nombre, paterno, materno,f_nacimiento, correo, telefono, contrasenia, sexo,f_registro, estado, tipo,idUsuario)=>{
    const [resultado] = await pool.query("UPDATE usuario SET nombreDeUsuario=?, nombre=?, paterno=?, materno=?,f_nacimiento=?, correo=?, telefono=?, contrasenia=?, sexo=?,f_registro=?, estado=?, tipo=? WHERE idUsuario=?",[nombreDeUsuario, nombre, paterno, materno,f_nacimiento, correo, telefono, contrasenia, sexo,f_registro, estado, tipo,idUsuario]);
    return resultado;
}
