<template>
    <img src="../../../imagenes/logoFinal.webp" alt="">
    <el-button class="agregar" type="danger" plain>ELIMINAR USUARIO</el-button>

    <section>
        <h1>Usuarios registrados</h1>
        <el-table :data="usuarios"  style="width: 100%">
          <el-table-column prop="idUsuario" label="ID" width="40" />
          <el-table-column prop="nombreDeUsuario" label="NOMBRE DE USUARIOS" width="180" />
          <el-table-column prop="nombre" label="NOMBRE" width="180" />
          <el-table-column prop="paterno" label="PATERNO" width="140" />
          <el-table-column prop="materno" label="MATERNO" width="140" />
          <el-table-column prop="f_nacimiento" label="FECHA NACIMIENTO" width="176" />
          <el-table-column prop="correo" label="CORREO" width="180" />
          <el-table-column prop="telefono" label="TELEFONO" width="120" />
          <el-table-column prop="contrasenia" label="CONTRASENIA" width="180" />
          <el-table-column prop="sexo" label="SEXO" width="130" />
          <el-table-column prop="f_registro" label="FECHA REGISTRO" width="180" />
          <el-table-column prop="estado" label="ESTADO" width="80" />
          <el-table-column prop="tipo" label="TIPO" width="80" />
        </el-table>
    </section>

</template>

<script setup>

import { onMounted,ref} from 'vue';
import { listadoUsuarios } from '@/apis/api';

const usuarios = ref([]);

const tablaUsuario = async () =>{
    try{
        const resultado = await listadoUsuarios();
        usuarios.value=resultado;
    }catch(error){
        console.error(error);
    }
}
onMounted(tablaUsuario);
defineExpose({tablaUsuario});


</script>


<style scoped>
.agregar{
    position: absolute;
    right: 70px;
    top:150px;
    width: 150px;
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
    margin-left: 450px;
}
section{
    width: 1500px;
    margin-left:10px;
    height: auto    ;
    top: 40px;
}
p{
    font-size: 28px;
}
</style>