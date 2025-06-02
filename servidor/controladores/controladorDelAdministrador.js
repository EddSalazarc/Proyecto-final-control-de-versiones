import * as registroAdministrador from '../modelos/modeloDelAdministrador.js';
//INICIO DE LOS LISTADOS
export const listadoUsuarios = async (req,res) =>{
    try{
        const usuarios = await registroAdministrador.mostrarUsuario();
        res.status(200).json(usuarios);
    }catch(error){
        res.status(500).json({message:'Error a la hora de mostrar los usuarios (controlador)',error:error.message});
    }
}

export const listadoClientes = async (req,res) =>{
    try{
        const clientes = await registroAdministrador.mostrarClientes();
        res.status(200).json(clientes);
    }catch(error){
        res.status(500).json({message:'Error a la hora de mostrar los clientes (controlador)',error:error.message});
    }
}

export const listadoAdministradores = async (req,res) =>{
    try{
        const administradores = await registroAdministrador.mostrarAdministrador();
        res.status(200).json(administradores);
    }catch(error){
        res.status(500).json({message:'Error a la hora de mostrar los administradores (controlador)',error:error.message});
    }
}

export const listadoProductos = async (req,res) =>{
    try{
        const productos = await registroAdministrador.mostrarProducto();
        res.status(200).json(productos);
    }catch(error){
        res.status(500).json({message:'Error a la hora de mostrar los productos (controlador)',error:error.message});
    }
}

export const listadoVentas = async (req,res) =>{
    try{
        const ventas = await registroAdministrador.mostrarVenta();
        res.status(200).json(ventas);
    }catch(error){
        res.status(500).json({message:'Error a la hora de mostrar las ventas (controlador)',error:error.message});
    }
}

export const listadoVentasPorId = async (req,res) => {

    try{
        const {idCliente} = req.params;
        const ventas = await registroAdministrador.mostrarVentaPorId(idCliente);
        res.status(200).json(ventas);
    }catch(error){
        res.status(500).json({message:`Error a la hora de mostrar las ventas por id (controlador)${req.body} `,error:error.message});
    }
}

export const listadoHistorialDeAccesos = async (req,res) =>{
    try{
        const historial_accesos = await registroAdministrador.mostrarHistorialDeAcceso();
        res.status(200).json(historial_accesos);
    }catch(error){
        res.status(500).json({message:'Error a la hora de mostrar los historiales accesos (controlador)',error:error.message});
    }
}


//INICIO DE LAS AGREGACIONES

export const agregarUsuarios = async(req,res) => {
    try{
        const {nombreDeUsuario, nombre, paterno, materno,f_nacimiento, correo, telefono, contrasenia, sexo, estado, tipo}=req.body;
        const usuarios = await registroAdministrador.insertarUsuario(nombreDeUsuario,nombre, paterno, materno,f_nacimiento, correo, telefono, contrasenia, sexo, estado, tipo);
        res.status(200).json(usuarios)

    }catch(error){
        res.status(500).json({message:'Error a la hora de agregar a los usuarios (controlador)'});

    }
}

export const agregarClientes = async(req,res) => {
    try{
        const {saldo_pendiente}=req.body;
        const clientes = await registroAdministrador.insertarCliente(saldo_pendiente);
        res.status(200).json(clientes)

    }catch(error){
        res.status(500).json({message:'Error a la hora de agregar a los clientes (controlador)'});

    }
}

export const agregarAdministradores = async(req,res) => {
    try{
        const {nomAdmin}=req.body;
        const administradores = await registroAdministrador.insertarAdministrador(nomAdmin);
        res.status(200).json(administradores)

    }catch(error){
        res.status(500).json({message:'Error a la hora de agregar a los administradores (controlador)'});
    }
}

export const agregarProductos = async(req,res) => {
    try{
        const {nomProducto, descripcion, cantidad, precio, categoria, idAdmin}=req.body;
        const productos = await registroAdministrador.insertarProducto(nomProducto, descripcion, cantidad, precio, categoria, idAdmin);
        res.status(200).json(productos)

    }catch(error){
        res.status(500).json({message:'Error a la hora de agregar a los productos (controlador)'});
    }
}

export const agregarVentas = async(req,res) => {
    try{
        const {cantidad, precio_unitario, monto_cancelado, observaciones, idCliente, idProducto, idAdmin}=req.body;
        const ventas = await registroAdministrador.insertarVenta(cantidad, precio_unitario, monto_cancelado, observaciones, idCliente, idProducto, idAdmin);
        res.status(200).json( ventas)

    }catch(error){
        res.status(500).json({message:'Error a la hora de agregar a los  ventas (controlador)'});
    }
}


export const agregarHistoriales = async(req,res) => {
    try{
        const {direccion_ip, evento, navegador, idUsuario}=req.body;
        const historiales = await registroAdministrador.insertarHistorialDeAcceso(direccion_ip, evento, navegador, idUsuario);
        res.status(200).json( historiales)

    }catch(error){
        res.status(500).json({message:'Error a la hora de agregar a los  historiales (controlador)'});
    }
}

//INICIO DE LAS ELIMINACIONES

export const eliminarUsuarios = async(req,res) =>{
    try{
        const {idUsuario} = req.params;
        const respuesta = await registroAdministrador.eliminarUsuario(idUsuario);
        res.status(200).json(respuesta);    

    }catch(error){
        res.status(500).json({message:'Error a la hora de eliminar a los  usuarios (controlador)'});
    }
}

export const eliminarProductos = async(req,res) =>{
    try{
        const {idProducto} = req.params;
        const respuesta = await registroAdministrador.eliminarProduto(idProducto);
        res.status(200).json(respuesta);    

    }catch(error){
        res.status(500).json({message:'Error a la hora de eliminar a los  productos (controlador)'});
    }
}

//INICIO DE LAS EDICIONES
export const actualizarProducto = async(req,res) => {
    try{
        const {idProducto} = req.params;
        const {nomProducto, descripcion, cantidad , precio, categoria, idAdmin} = req.body;
        const respuesta = await registroAdministrador.editarProducto(nomProducto, descripcion, cantidad , precio, categoria, idAdmin,idProducto);
        res.status(200).json(respuesta);
        
    }catch(error){  
        res.status(500).json({message:'Error atrapado mientras se actualizaba el producto (controlador)',error:error.message});
    }
}

export const actualizarAdministrador = async(req,res) => {
    try{
        const {idAdmin} = req.params;
        const {nomAdmin} = req.body;
        const respuesta = await registroAdministrador.editarAdministrador(nomAdmin, idAdmin);
        res.status(200).json(respuesta);
        
    }catch(error){  
        res.status(500).json({message:'Error atrapado mientras se actualizaba el administrador (controlador)',error:error.message});
    }
}

export const actualizarUsuario = async(req,res) => {
    try{
        const {idUsuario} = req.params;
        const {nombreDeUsuario, nombre, paterno, materno,f_nacimiento, correo, telefono, contrasenia, sexo,f_registro, estado, tipo} = req.body;
        const respuesta = await registroAdministrador.editarUsuario(nombreDeUsuario, nombre, paterno, materno,f_nacimiento, correo, telefono, contrasenia, sexo,f_registro, estado, tipo,idUsuario);
        res.status(200).json(respuesta);
        
    }catch(error){  
        res.status(500).json({message:'Error atrapado mientras se actualizaba el usuario (controlador)',error:error.message});
    }
}



/*
export const eliminarEstudiantesController = async (req,res) => {
    try{
        const {id_estudiante} = req.params;
        const respuesta = await Registro.eliminarEstudiante(id_estudiante);
        res.status(200).json(respuesta);    
    }catch(error){
        res.status(500).json({message:'Error atrapdo a la hora de eliminar el estudiante (controlador)'})
    }

}*/