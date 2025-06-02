<template>
        <img src="../../../imagenes/logoFinal.webp" alt="">
        <!-- <el-button class="agregar" type="warning" plain>AGREGAR</el-button> -->

        <h1>REGISTRO DE TODAS LAS VENTAS</h1>
    <section>

        <el-table :data="ventas"  style="width: 100%">
          <el-table-column prop="idCompra" label="ID" width="40" />
          <el-table-column prop="fecha" label="FECHA" width="190" />
          <el-table-column prop="cantidad" label="CANTIDAD" width="180" />
          <el-table-column prop="precio_unitario" label="PRECIO UNITARIO" width="140" />
          <el-table-column prop="monto_cancelado" label="MONTO CANCELADO" width="170" />
          <el-table-column prop="observaciones" label="OBSERVACIONES" width="186" />
          <el-table-column prop="idCliente" label="ID CLIENTE" width="186" />
          <el-table-column prop="idProducto" label="ID producto" width="186" />
         
     
        </el-table>
    </section>

</template>

<script setup>

import { onMounted,ref} from 'vue';
import { listadoVentas } from '@/apis/api';

const ventas = ref([]);

const tablaVentas = async () =>{
    try{
        const resultado = await listadoVentas();
        ventas.value=resultado;
    }catch(error){
        console.error(error);
    }
}
onMounted(tablaVentas);
defineExpose({tablaVentas});

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
    margin-left:380px;
}
section{
    width:1279px;
    margin-left:130px;
    height: 100%;
    top: 40px;
    background-color: red;
}
p{
    font-size: 28px;
}
</style>