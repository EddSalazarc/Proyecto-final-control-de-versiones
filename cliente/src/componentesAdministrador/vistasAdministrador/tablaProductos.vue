<template>
        <img src="../../../imagenes/logoFinal.webp" alt="">
        <div class="botones-superiores">
          <el-button @click="modalAgregacion = true" class="agregar" type="warning" plain>AGREGAR</el-button>
          <el-button @click="generarPDF" class="exportar" type="success" plain>EXPORTAR PDF</el-button>
        </div>

        <h1>Productos</h1>
    <section>

        <el-table :data="productos"  style="width: 100%">
          <el-table-column prop="idProducto" label="ID" width="40" />
          <el-table-column prop="nomProducto" label="NOMBRE DEL PRODUCTO" width="190" />
          <el-table-column prop="descripcion" label="DESCRIPCION" width="180" />
          <el-table-column prop="cantidad" label="CANTIDAD" width="140" />
          <el-table-column prop="precio" label="PRECIO" width="140" />
          <el-table-column :formatter="formatearFecha" prop="f_actualizacion" label="FECHA ACTUALIZACION" width="186" />
          <el-table-column prop="categoria" label="CATEGORIA" width="180" />
          <el-table-column prop="idAdmin" label="ADMINISTRADOR POR" width="180" />
          <el-table-column prop="" label="OPERACIONES" width="180">
              <template #default="scoped">
                  <el-button type="primary" @click="mostrarModalDeEdicion(scoped.row)" :icon="Edit" circle />
                  <el-button type="danger" @click="eliminacionDelProducto(scoped.row.idProducto)" :icon="Delete" circle />
              </template>
          </el-table-column>
        </el-table>
    </section>

<!-- // EL MODAL DE EDICION-->
  <el-dialog v-model="dialogFormVisible" title="Edici&oacute;n del producto" width="500">
      <el-form :model="form">
          <el-form-item label="nombre producto: "  :label-width="formLabelWidth">
            <el-input v-model="form.nomProducto" autocomplete="off" />
          </el-form-item>

          <el-form-item label="descripcion:" :label-width="formLabelWidth">
            <el-input v-model="form.descripcion" autocomplete="off" />
          </el-form-item>

          <el-form-item label="cantidad: " :label-width="formLabelWidth">
            <el-input v-model="form.cantidad" autocomplete="off" />
          </el-form-item>

          <el-form-item label="precio:" :label-width="formLabelWidth">
            <el-input v-model="form.precio" autocomplete="off" />
          </el-form-item>
          
          <el-form-item label="categoria" :label-width="formLabelWidth">
            <el-input v-model="form.categoria" autocomplete="off" />
          </el-form-item>

          <el-form-item label="id administrador" :label-width="formLabelWidth">
            <el-input v-model="form.idAdmin" autocomplete="off" />
          </el-form-item>
            <div class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
              <el-button type="primary" native-type="submit" @click="enviarProductoActualizado()">
                Confirm
              </el-button>
            </div>

      </el-form>
  </el-dialog> 

<!-- // EL MODAL DE AGREGACION-->
  
  <el-dialog v-model="modalAgregacion" title="DATOS DEL PRODUCTO" width="500">
    
    <el-form :model="formAgregar" @submit.prevent="enviarProducto()">
      <el-form-item label="Nombre: " :label-width="formLabelWidth">
        <el-input  v-model="formAgregar.nomProducto" autocomplete="off" />
      </el-form-item>


      <el-form-item label="Descripcion: " :label-width="formLabelWidth">
        <el-input v-model="formAgregar.descripcion" autocomplete="off" />
      </el-form-item>

      <el-form-item label="Cantidad: " :label-width="formLabelWidth">
        <el-input v-model="formAgregar.cantidad" autocomplete="off" />
      </el-form-item>
      
       <el-form-item label="Precio: " :label-width="formLabelWidth">
        <el-input v-model="formAgregar.precio" autocomplete="off" />
      </el-form-item>
      
       <el-form-item label="Categoria: " :label-width="formLabelWidth">
        <el-input v-model="formAgregar.categoria" autocomplete="off" />
      </el-form-item>

      <el-form-item label="Id admin: " :label-width="formLabelWidth">
        <el-input v-model="formAgregar.idAdmin" autocomplete="off" />
      </el-form-item>

      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" native-type="submit">
          Confirm
        </el-button>
      </div>

    
    </el-form>
 
  </el-dialog>

<div id="pdfContent" style="display: none;">
  <h2>Reporte de Productos</h2>
  <table border="1" cellspacing="0" cellpadding="5">
    <thead>
      <tr>
        <th>ID</th>
        <th>NOMBRE</th>
        <th>DESCRIPCIÓN</th>
        <th>CANTIDAD</th>
        <th>PRECIO</th>
        <th>FECHA ACTUALIZACIÓN</th>
        <th>CATEGORÍA</th>
        <th>ADMINISTRADOR</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="producto in productos" :key="producto.idProducto">
        <td>{{ producto.idProducto }}</td>
        <td>{{ producto.nomProducto }}</td>
        <td>{{ producto.descripcion }}</td>
        <td>{{ producto.cantidad }}</td>
        <td>{{ producto.precio }}</td>
        <td>{{ formatearFecha({}, {}, producto.f_actualizacion) }}</td>
        <td>{{ producto.categoria }}</td>
        <td>{{ producto.idAdmin }}</td>
      </tr>
    </tbody>
  </table>
</div>

</template>

<script setup>

//INICIO DEL SCRIPT DEL PDF
// Agrega estas importaciones al inicio del script
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Agrega este método en el script setup
const generarPDF = async () => {
  try {
    // Mostrar temporalmente el contenido del PDF
    const pdfElement = document.getElementById('pdfContent');
    pdfElement.style.display = 'block';
    
    // Crear el canvas
    const canvas = await html2canvas(pdfElement);
    const imgData = canvas.toDataURL('image/png');
    
    // Configurar el PDF
    const pdf = new jsPDF('landscape');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    // Agregar la imagen al PDF
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    // Ocultar nuevamente el contenido
    pdfElement.style.display = 'none';
    
    // Descargar el PDF
    pdf.save('reporte_productos.pdf');
  } catch (error) {
    console.error('Error al generar PDF:', error);
    alert('Error al generar el PDF');
  }
};

//FIN DEL SCRIPT DEL PDF




import { onMounted,reactive,ref} from 'vue';

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

import { listadoProductos,actualizarProductos, eliminarProductos, agregarProductos } from '@/apis/api.js';
import { formatter } from 'element-plus';

// //inicio del script del modal de edicion
const formLabelWidth = '150px'
const dialogFormVisible = ref(false);

const form = reactive({
  idProducto:null,
  nomProducto: '',
  descripcion: '',
  cantidad:'',
  precio:'',
  categoria:'',
  idAdmin:'',
})

// //MOSTRAR EL MODAL DE EDICION
 const mostrarModalDeEdicion = async(producto)=>{
   try{
     form.idProducto = producto.idProducto;
     form.nomProducto = producto.nomProducto;
     form.descripcion = producto.descripcion;
     form.cantidad = producto.cantidad; 
     form.precio = producto.precio;
     form.categoria = producto.categoria;
     form.idAdmin = producto.idAdmin;
     dialogFormVisible.value = true;
   }catch(error){
     alert(error);
   }
 }

const enviarProductoActualizado = async()=>{
  try{
    const objeto = {
      idProducto : form.idProducto,
      nomProducto : form.nomProducto,
      descripcion : form.descripcion,
      cantidad : parseInt(form.cantidad),
      precio : parseFloat(form.precio),
      categoria : form.categoria,
      idAdmin : parseInt(form.idAdmin),
    }
    await actualizarProductos(objeto);
    dialogFormVisible.value = false;
    await tablaProductos();
  }catch(error){
    alert(error);
  }
}

//fin del modal de edicion 

const eliminacionDelProducto = async (idProducto) =>{
    try{
      await eliminarProductos(idProducto);
      await tablaProductos()

    }catch(error){
        alert(error)
    }
}

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

const formAgregar = reactive({
  nomProducto: '',
  descripcion: '',
  cantidad: '',
  precio: '',
  categoria: '',
  idAdmin: ''
})

const modalAgregacion= ref(false);

const enviarProducto = async () =>{
    try{
        const objeto={
            ...formAgregar,//hacemos un copia de los datos que tenemos en form
            cantidad : parseInt(formAgregar.cantidad),
            precio : parseFloat(formAgregar.precio),
            idAdmin : parseInt(formAgregar.idAdmin),
        }
        console.log("objetos a enviar a la bd",objeto);
        
        const respuesta = await agregarProductos(objeto);
        modalAgregacion.value=false;
        tablaProductos();
    }
    catch(error){
        alert("error en el frontend a la hora de agregar\n",error);

    }   
}

</script>


<style scoped>
h2{
  font-size: 50px;
  color:#7a5c38;  
  text-transform: uppercase;
  margin-top:80px;
  margin-left:520px;
}
table{
  position: relative;
  margin-left:290px;
}
.botones-superiores {
  position: absolute;
  right: 83px;
  top: 150px;
  display: flex;
  gap: 10px;
}

.agregar {
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
    height:500px;
    top: 40px;
    background-color: rgb(255, 255, 255);
}
p{
    font-size: 28px;
}
</style>