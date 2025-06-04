<template>
    <img src="../../../imagenes/logoFinal.webp" alt="">
    <!-- <el-button @click="modalAgregacion = true" class="agregar" type="warning" plain>AGREGAR</el-button> -->
    <!-- <el-button class="eliminar" type="danger" plain  @click="dialogFormVisible = true">ELIMINAR CLIENTE</el-button> -->

        <h1>Clientes registrados</h1>

    <section>
        <el-table :data="clientes"  style="width: 100%">
          <el-table-column prop="idCliente" label="ID" width="40" />
          <el-table-column prop="nombreDeUsuario" label="NOMBRE DE USUARIO" width="180" />
          <el-table-column prop="saldo_pendiente" label="SALDO PENDIENTE" width="180" />
        
          <el-table-column prop="" label="GESTIONAR VENTAS" width="180" >
            <template #default="scoped">
                <RouterLink  :to="direccion('tablaVentas',scoped.row.idCliente,scoped.row.nombreDeUsuario)">
                    <el-button type="warning" plain>VER VENTAS</el-button>
                </RouterLink>
 <!-- :to="direccion('tablaVentas',scoped.row.idCliente)" -->
            </template>
          </el-table-column>

        </el-table>
    </section>

  
  <el-dialog v-model="modalAgregacion" title="DATOS DEL CLIENTE" width="500">
    
    <el-form :model="formAgregar" @submit.prevent="enviarProducto()">
      <el-form-item label="saldo_pendiente: " :label-width="formLabelWidth">
        <el-input  v-model="formAgregar.saldo_pendiente" autocomplete="off" />
      </el-form-item>

      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" native-type="submit">  <!--AQUI CAMBIAMOS(pasado) DE POSICION LOS BOTONES
            PUESTO QUE NO ESTABAN DENTRO DE NUESTO  @submit.prevent="EnviarEstudiante()"-->
          Confirm
        </el-button>
      </div>

    
    </el-form>
 
  </el-dialog>




</template>

<script setup>

// En el script
const dialogFormVisible = ref(false);

const formAgregar = reactive({
  saldo_pendiente: '',

})


const modalAgregacion= ref(false);

const enviarProducto = async () =>{
    try{
        const objeto={
            saldo_pendiente : parseFloat(formAgregar.saldo_pendiente),
        }
        console.log("objetos a enviar a la bd",objeto);
        
        const respuesta = await agregarCliente(objeto);
        modalAgregacion.value=false;
        tablaClientes();
    }
    catch(error){
        alert("error en el frontend a la hora de agregar\n",error);

    }   
}




//INICIO DEL ELIMINAR CLIENTE
const idUsuario = ref('');


//FIN DEL ELIMINAR CLIENTE



function direccion(variable,id,nombre){
    // return `/${variable}/${id}`
    return{

    name: variable, 
    params: { 
      id: id 
    },
    query: {
      cliente: nombre 
    }
    }

}

import { onMounted,reactive,ref} from 'vue';
import { agregarCliente, listadoClientes } from '@/apis/api';





const clientes = ref([]);

const tablaClientes = async () =>{
    try{
        const resultado = await listadoClientes();
        clientes.value=resultado;
    }catch(error){
        console.error(error);
    }
}
onMounted(tablaClientes);
defineExpose({tablaClientes});





import {
  Delete,
  Edit,
} from '@element-plus/icons-vue'
import { routerViewLocationKey } from 'vue-router';


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
    width: 580px;
    margin-left:480px;
    height: auto    ;
    top: 40px;
}
p{
    font-size: 28px;
}
</style>