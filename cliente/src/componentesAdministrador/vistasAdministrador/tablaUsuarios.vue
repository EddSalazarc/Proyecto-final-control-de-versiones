<template>
    <img src="../../../imagenes/logoFinal.webp" alt="">
    <el-button class="agregar" type="danger" plain  @click="dialogFormVisible = true">ELIMINAR USUARIO</el-button>
    <el-button class="estadisticas" type="info" plain @click="mostrarGraficos = true">ESTADÍSTICAS</el-button>

    <section>
        <h1>Usuarios registrados</h1>
        <el-table :data="usuarios"  style="width: 100%">
          <el-table-column prop="idUsuario" label="ID" width="40" />
          <el-table-column prop="nombreDeUsuario" label="NOMBRE DE USUARIOS" width="180" />
          <el-table-column prop="nombre" label="NOMBRE" width="180" />
          <el-table-column prop="paterno" label="PATERNO" width="140" />
          <el-table-column prop="materno" label="MATERNO" width="140" />
          <el-table-column :formatter="formatearFecha" prop="f_nacimiento" label="FECHA NACIMIENTO" width="176" />
          <el-table-column prop="correo" label="CORREO" width="180" />
          <el-table-column prop="telefono" label="TELEFONO" width="120" />
          <el-table-column prop="contrasenia" label="CONTRASENIA" width="180" />
          <el-table-column prop="sexo" label="SEXO" width="130" />
          <el-table-column :formatter="formatearFecha" prop="f_registro" label="FECHA REGISTRO" width="180" />
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

<!-- MODAL GRAFICO -->
<el-dialog v-model="mostrarGraficos" title="Estadísticas de Usuarios" width="80%">
  <div class="graficos-container">

    <div class="grafico">
      <h3>Distribución por Sexo</h3>
      <canvas ref="sexoChart"></canvas>
    </div>
    

    <div class="grafico">
      <h3>Distribución por Tipo de Usuario</h3>
      <canvas ref="tipoChart"></canvas>
    </div>
    
    <!-- <div class="grafico">
      <h3>Usuarios por Estado</h3>
      <canvas ref="estadoChart"></canvas>
    </div> -->
  </div>
  
  <template #footer>
    <div class="dialog-footer">
      <el-button @click="mostrarGraficos = false">Cerrar</el-button>
    </div>
  </template>
</el-dialog>


</template>

<script setup>


///FIN DE LA ESTADISTICA

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


import {watch, onMounted,ref} from 'vue';
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

//INICIO DE LA ESTADISTICA
 // Agrega estas importaciones al inicio del script
 import Chart from 'chart.js/auto';
 // Agrega estas variables reactivas
 const mostrarGraficos = ref(false);
 const sexoChart = ref(null);
 const tipoChart = ref(null);
 const estadoChart = ref(null);
 // Agrega este método para generar los gráficos
 const generarGraficos = () => {
   if (!usuarios.value.length) return;

   // Datos para gráficos
   const conteoSexo = {
     Masculino: 0,
     Femenino: 0,
     Otro: 0
   };

   const conteoTipo = {};
   const conteoEstado = {
     Activo: 0,
     Inactivo: 0
   };

   usuarios.value.forEach(usuario => {
     // Conteo por sexo
     conteoSexo[usuario.sexo] = (conteoSexo[usuario.sexo] || 0) + 1;
  
     // Conteo por tipo
     conteoTipo[usuario.tipo] = (conteoTipo[usuario.tipo] || 0) + 1;
  
     // Conteo por estado
     const estado = usuario.estado === 1 ? 'Activo' : 'Inactivo';
     conteoEstado[estado] = (conteoEstado[estado] || 0) + 1;
   });

   // Destruir gráficos anteriores si existen
   [sexoChart, tipoChart, estadoChart].forEach(chart => {
     if (chart.value?.instance) {
       chart.value.instance.destroy();
     }
   });

   // Gráfico de sexo
   const sexoCtx = sexoChart.value.getContext('2d');
   sexoChart.value.instance = new Chart(sexoCtx, {
     type: 'pie',
     data: {
       labels: Object.keys(conteoSexo),
       datasets: [{
         data: Object.values(conteoSexo),
         backgroundColor: [
           '#36A2EB',
           '#FF6384',
           '#FFCE56'
         ]
       }]
     }
   });

   // Gráfico de tipo
   const tipoCtx = tipoChart.value.getContext('2d');
   tipoChart.value.instance = new Chart(tipoCtx, {
     type: 'bar',
     data: {
       labels: Object.keys(conteoTipo),
       datasets: [{
         label: 'Cantidad',
         data: Object.values(conteoTipo),
         backgroundColor: '#4BC0C0'
       }]
     }
   });

   // Gráfico de estado
   const estadoCtx = estadoChart.value.getContext('2d');
   estadoChart.value.instance = new Chart(estadoCtx, {
     type: 'doughnut',
     data: {
       labels: Object.keys(conteoEstado),
       datasets: [{
         data: Object.values(conteoEstado),
         backgroundColor: [
           '#66BB6A',
           '#EF5350'
         ]
       }]
     }
   });
 };
 // Observar cambios en el modal para generar gráficos cuando se abre
 watch(mostrarGraficos, (val) => {
   if (val) {
     // Usar nextTick para asegurar que el DOM esté listo
     setTimeout(generarGraficos, 100);
   }
 });
 // Observar cambios en los datos para actualizar gráficos
 watch(usuarios, () => {
   if (mostrarGraficos.value) {
     generarGraficos();
   }
 });

//FIN DE LA ESTADISTICA




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

/* Agrega estos estilos */
.estadisticas {
  position: absolute;
  right: 240px;
  top: 150px;
  width: 150px;
}

.graficos-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.grafico {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.grafico h3 {
  margin-top: 0;
  text-align: center;
  color: #7a5c38;
}

.grafico canvas {
  width: 100% !important;
  height: 350px !important;
}
</style>