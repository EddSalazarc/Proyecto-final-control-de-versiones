<template>
    <img src="../../../imagenes/logoFinal.webp" alt="">
        <h1>Historial de acceso</h1>

    <section>
        <el-table :data="historial"  style="width: 100%">
          <el-table-column prop="idLogin" label="ID" width="40" />
          <el-table-column prop="direccion_ip" label="DIRECCION IP" width="180" />
          <el-table-column prop="evento" label="EVENTO" width="180" />
          <el-table-column prop="navegador" label="NAVEGADOR" width="180" />
          <el-table-column prop="nombreDeUsuario" label="NOMBRE DE USUARIO" width="180" />
        </el-table>
    </section>

</template>

<script setup>

import { onMounted,ref} from 'vue';
import { listadoHistoriales } from '@/apis/api';

const historial = ref([]);

const tablaHistorial = async () =>{
    try{
        const resultado = await listadoHistoriales();
        historial.value=resultado;
    }catch(error){
        console.error(error);
    }
}
onMounted(tablaHistorial);
defineExpose({tablaHistorial});



import {
  Delete,
  Edit,
} from '@element-plus/icons-vue'


</script>


<style scoped>

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
    margin-left: 450px;
}
section{
    width: 760px;
    margin-left:350px;
    height: auto    ;
    top: 40px;
}
p{
    font-size: 28px;
}
</style>