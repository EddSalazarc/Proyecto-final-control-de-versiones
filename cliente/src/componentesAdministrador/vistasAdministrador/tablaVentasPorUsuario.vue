<template>
        <img src="../../../imagenes/logoFinal.webp" alt="">
        <el-button class="agregar" type="warning" plain>AGREGAR</el-button>
  
        <h1>Ventas al usuario<br> &nbsp; &nbsp;  {{ nombre }} id: {{ id }}</h1>
    <section>
        
          <el-table :data="ventas"  style="width: 100%">
          <el-table-column prop="idCompra" label="ID" width="40" />
          <el-table-column :formatter="formatearFecha" prop="fecha" label="FECHA" width="154" />
          <el-table-column prop="nomProducto" label="NOMBRE PRODUCTO" width="180" />
          <el-table-column prop="descripcion" label="DESCRIPCION" width="180" />
          <el-table-column prop="cantidad" label="CANTIDAD" width="100" />
          <el-table-column prop="precio_unitario" label="PRECIO UNITARIO" width="140" />
          <el-table-column prop="monto_cancelado" label="MONTO CANCELADO" width="165" />
          <el-table-column prop="observaciones" label="OBSERVACIONES" width="186" />
          <el-table-column prop="" label="OPERACIONES" width="180">
              <template #default="scoped">
                  <el-button type="primary" :icon="Edit" circle />
                  <el-button type="danger" :icon="Delete" circle />
              </template>
          </el-table-column>
          <el-table-column prop="" label="TOTAL" width="130" />

        </el-table>
    </section>

</template>

<script setup>
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


import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
const nombre = route.query.cliente;
console.log("ID:", id, "Nombre:", nombre);

import { onMounted,ref} from 'vue';
import { listadoVentasPorId } from '@/apis/api';

const ventas = ref([]);


const tablaVentasPorUsuario = async () =>{
    try{
        const resultado = await listadoVentasPorId(id);
        ventas.value=resultado;
    }catch(error){
        console.error(error);
    }
}
onMounted(tablaVentasPorUsuario);
defineExpose({tablaVentasPorUsuario});


import {
  Delete,
  Edit,
} from '@element-plus/icons-vue'

</script>


<style scoped>
.agregar{
    position: absolute;
    right: 83px;
    top:150px;
    width: 130px;
}
img{
    position: absolute;
    width: 155px;
    right:70px;
    top:-30px;
}
h1{
    font-size: 50px;
    color:#7a5c38;  
    text-transform: uppercase;
    margin-left:580px;
}
section{
    width:1455px;
    margin-left:40px;
    height: 100%;
    top: 40px;
    background-color: red;
}
p{
    font-size: 28px;
}
</style>