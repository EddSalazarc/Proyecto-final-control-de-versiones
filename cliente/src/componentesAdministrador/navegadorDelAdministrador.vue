<template>

    <el-button text @click="dialog = true"   class="boton">menu</el-button >
    <el-drawer v-model="dialog"  title="" direction="ltr"  class="demo-drawer">
        <h1>Bienvenido <br>   {nombre} </h1>
        <ul>
            <li><RouterLink class="links" @click="dialog = false"  :to="direccion('')" >Inicio</RouterLink></li>
            <li><RouterLink class="links" @click="dialog = false"  :to="direccion('tablaUsuarios')" >Usuarios</RouterLink></li> <!-- esto es para gestionar los usuarios -->
            <li><RouterLink class="links" @click="dialog = false"  :to="direccion('tablaProductos')" >Productos</RouterLink></li>
            <li><RouterLink class="links" @click="dialog = false"  :to="direccion('tablaClientes')" >Clientes</RouterLink></li>
            <li><RouterLink class="links" @click="dialog = false"  :to="direccion('tablaFianzas')" >Gestion de las ventas</RouterLink></li>
            <li><RouterLink class="links" @click="dialog = false"  :to="direccion('historial')" >historial de acceso</RouterLink></li>
            <li><RouterLink class="links" @click="dialog = false"  :to="direccion('configuracionCuenta')" >Configuración de la cuenta</RouterLink></li>
            <li><RouterLink class="links" @click="dialog = false"  :to="direccion('cerrarSesion')" >Cerrar sesion</RouterLink></li>
        </ul>
  </el-drawer>
       
        
  </template>
 
<script setup>
function direccion(variable){
    return `/${variable}`
}
import { ref } from 'vue'

const dialog = ref(false)


</script>

<style scoped>

.boton{
    margin:10px;
}
.links{
    text-decoration: none;
    color:#7a5c38b6;

}
.links:hover{
    color:#392b1a;
}
.links:focus{
    color:#392b1a;
}

h1{
    margin-top: -30px;
    color:#7a5c38;
    font-size: 40px;
    margin-left:40px;
}
/* nav{
    padding: 5px;
    width: 308px;
    height: 730px;
    border-right: 4px dashed #7a5c38;
    /* background-color: #7a5c38; 
    float:left;
    margin-top:-45px;
    position: fixed;
} */
ul{
    list-style-type: none;
    color:aliceblue;
    font-size: 20px;
    margin-top: 70px;
    margin-left:-30px;
}
li{
    margin: 30px
}
</style>