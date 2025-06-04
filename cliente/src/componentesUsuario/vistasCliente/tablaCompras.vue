<template>
        <header>
        <nav>
            <RouterLink :to="direccion('cliente')" class="enlace">Inicio</RouterLink>
            <RouterLink :to="direccionEsp('configuracion')" class="enlace">Configuración</RouterLink>
            <a href="#" class="enlace" @click="handleCerrarSesion">Cerrar sesión</a>
        </nav>
        </header>
        <img src="../../../imagenes/logoFinal.webp" class="logo" alt="">

    <h1>Hola {{ nombre }}! <br> Hecha un vistazo a tus compras</h1>

    <section>
        <el-table :data="compras"  style="width: 100%">
          <el-table-column prop="idCompra" label="ID" width="40" />
          <el-table-column :formatter="formatearFecha" prop="fecha" label="FECHA" width="154" />
          <el-table-column prop="nomProducto" label="NOMBRE PRODUCTO" width="180" />
          <el-table-column prop="descripcion" label="DESCRIPCION" width="180" />
          <el-table-column prop="cantidad" label="CANTIDAD" width="100" />
          <el-table-column prop="precio_unitario" label="PRECIO UNITARIO" width="140" />
          <el-table-column prop="monto_cancelado" label="MONTO CANCELADO" width="165" />
          <el-table-column prop="observaciones" label="OBSERVACIONES" width="186" />
          

        </el-table>
    </section>



</template>

<script setup>
//INICIO DEL DESPLIEGUE

import { onMounted,ref} from 'vue';
import { listadoIdUsuario, listadoVentasPorId,cerrarSesion } from '@/apis/api';

import { useRoute } from 'vue-router';

const route = useRoute();
const nombre = route.query.cliente;
const nombreDeUsuario = String(nombre);
console.log(nombre);

const id= ref([]);

const compras = ref([]);
const tablaVentasPorUsuario = async () =>{
    try{
        const resultado = await listadoIdUsuario(nombreDeUsuario);
        id.value = resultado; 
        console.log(JSON.parse(JSON.stringify(id.value))); 

        const idCliente = id.value[0].idCliente || id.value[0].idUsuario; // Usa el campo correcto
        const respuesta = await listadoVentasPorId(idCliente);

        compras.value = respuesta;
    }catch(error){
        console.error(error);
    }
}
onMounted(tablaVentasPorUsuario);
defineExpose({tablaVentasPorUsuario});



//FIN DEL DESPLIEGUE

const formatearFecha = (row, column, cellValue) => {
   if (!cellValue) return '';
  const fecha = new Date(cellValue);
  return fecha.toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}


function direccionEsp(){
    return {
          path: '/configuracion',
          query: { cliente: nombreDeUsuario }
        }
}

function direccion(variable){
    return `/${variable}`
}
import {
  Delete,
  Edit,
} from '@element-plus/icons-vue'

async function handleCerrarSesion() {
    try {
       // dialog.value = false
        await cerrarSesion()
       // ElMessage.success(respuesta.mensaje)
        router.push('/')
    } catch (error) {
        ElMessage.error('Error al cerrar sesión')
    }
}
</script>

<style scoped>
h1{
    margin-left: 50px;
    font-size: 50px;
    color:#7a5c38;
}
.logo{
    position: absolute;

    width: 155px;
    margin-left: 1350px;
    margin-top: -99px;
   
}
nav{
    position: absolute;
    margin-top: 20px;
}
.enlace{
    margin-left: 120px;
    text-decoration: none;
    color: aliceblue;
    text-transform: uppercase;
    font-family: monospace;
    font-size: 30px;    
}
 header{
    position: relative;
    margin-top: -52px;
    width: 100%;
    height:80px;
    background-color:#7a5c38;
}
section{
    width:1145px;
    margin-left:200px;
    height: 100%;
    top: 40px;
    background-color: red;
}
</style>