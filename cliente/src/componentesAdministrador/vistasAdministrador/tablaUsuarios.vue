<template>
    <img src="../../../imagenes/logoFinal.webp" alt="">
    <el-button class="agregar" type="danger" plain  @click="dialogFormVisible = true">ELIMINAR USUARIO</el-button>

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

    <!-- MODAL PARA ELIMINAR POR ID -->
     
  <el-dialog v-model="dialogFormVisible" title="INTRODUZCA EL ID DEL USUARIO A ELIMINAR" width="500">
    <el-form>
      <el-form-item label="ID DEL USUARIO">
        <el-input v-model="idUsuario"/>
      </el-form-item>
    </el-form>
    
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">cancelar</el-button>
        <el-button type="primary"  @click="eliminarUsuario()">
          confirmar
        </el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup>

//inicio script para el eliminado
const idUsuario = ref('');

const dialogFormVisible = ref(false);

const eliminarUsuario = async () =>{
  try{
    await eliminarUsuarios(idUsuario.value);
    dialogFormVisible.value = false;
    window.location.reload();
    idUsuario.value = '';
  }catch(error){
    alert("error a la hora de eliminar")
  }

}
//fin del script para el eliminado


import { onMounted,ref} from 'vue';
import { listadoUsuarios,eliminarUsuarios } from '@/apis/api';

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