<template>
        <img src="../../../imagenes/logoFinal.webp" alt="">
        <el-button class="agregar" type="warning" plain>AGREGAR</el-button>

        <h1>Productos</h1>
    <section>

        <el-table :data="productos"  style="width: 100%">
          <el-table-column prop="idProducto" label="ID" width="40" />
          <el-table-column prop="nomProducto" label="NOMBRE DEL PRODUCTO" width="190" />
          <el-table-column prop="descripcion" label="DESCRIPCION" width="180" />
          <el-table-column prop="cantidad" label="CANTIDAD" width="140" />
          <el-table-column prop="precio" label="PRECIO" width="140" />
          <el-table-column prop="f_actualizacion" label="FECHA ACTUALIZACION" width="186" />
          <el-table-column prop="categoria" label="CATEGORIA" width="180" />
          <el-table-column prop="idAdmin" label="ADMINISTRADOR POR" width="180" />
          <el-table-column prop="" label="OPERACIONES" width="180">
              <template #default="scoped">
                  <el-button type="primary" :icon="Edit" circle />
                  <el-button type="danger" :icon="Delete" circle />
              </template>
          </el-table-column>


     
        </el-table>
    </section>

</template>

<script setup>



import { onMounted,ref} from 'vue';
import { listadoProductos } from '@/apis/api';

const productos = ref([]);

const tablaProductos = async () =>{
    try{
        const resultado = await listadoProductos();
        productos.value=resultado;
    }catch(error){
        console.error(error);
    }
}
onMounted(tablaProductos);
defineExpose({tablaProductos});

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
    width:1418px;
    margin-left:50px;
    height: 100%;
    top: 40px;
    background-color: red;
}
p{
    font-size: 28px;
}
</style>