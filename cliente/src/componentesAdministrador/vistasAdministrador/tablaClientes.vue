<template>
    <img src="../../../imagenes/logoFinal.webp" alt="">
    <!-- <el-button class="agregar" type="warning" plain>AGREGAR</el-button> -->
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
   

</template>

<script setup>



//INICIO DEL ELIMINAR CLIENTE
const idUsuario = ref('');
const dialogFormVisible = ref(false);


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

import { onMounted,ref} from 'vue';
import { listadoClientes } from '@/apis/api';





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