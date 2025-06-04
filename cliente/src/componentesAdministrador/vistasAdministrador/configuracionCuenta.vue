<template>
        <img src="../../../imagenes/logoFinal.webp" alt="">
        <h1>CONFIGURACION</h1>
        <section>
        
        <el-table :data="administrador"  style="width: 100%">
          <el-table-column prop="idAdmin" label="ID" width="40" />
          <el-table-column prop="nomAdmin" label="NOMBRE ADMIN" width="190" />
          <el-table-column prop="nombre" label="NOMBRE" width="180" />
          <el-table-column prop="paterno" label="PATERNO" width="140" />
          <el-table-column prop="materno" label="MATERNO" width="140" />
          <el-table-column :formatter="formatearFecha" prop="f_nacimiento" label="FECHA NACIMIENTO" width="186" />
          <el-table-column prop="correo" label="CORREO" width="180" />
          <el-table-column prop="telefono" label="TELEFONO" width="180" />
          <el-table-column prop="contrasenia" label="CONTRASEÑA" width="180" />
          <el-table-column prop="sexo" label="SEXO" width="180" />
          <el-table-column :formatter="formatearFecha" prop="f_registro" label="FECHA REGISTRO" width="186" />
          <el-table-column prop="estado" label="ESTADO" width="180" />
          <el-table-column prop="tipo" label="TIPO" width="180" />
          <el-table-column prop="" label="OPERACIONES" width="180">
              <template #default="scoped">
                  <el-button type="primary" @click="mostrarModalDeEdicion(scoped.row)"  :icon="Edit" circle />
              </template>
          </el-table-column>
        </el-table>
     </section>
    

<!-- // EL MODAL DE EDICION-->
  <el-dialog  v-model="dialogFormVisible" title="Edici&oacute;n de cuenta" width="500">
      <el-form :model="form">
          <el-form-item label="nombre admin:" :label-width="formLabelWidth">
            <el-input v-model="form.nomAdmin" autocomplete="off" />
          </el-form-item>

          <el-form-item label="nombre: " :label-width="formLabelWidth">
            <el-input v-model="form.nombre" autocomplete="off" />
          </el-form-item>

          <el-form-item label="paterno:" :label-width="formLabelWidth">
            <el-input v-model="form.paterno" autocomplete="off" />
          </el-form-item>
          
          <el-form-item label="materno" :label-width="formLabelWidth">
            <el-input v-model="form.materno" autocomplete="off" />
          </el-form-item>

          <el-form-item label="f_nacimiento" :label-width="formLabelWidth">
            <el-input v-model="form.f_nacimiento" autocomplete="off" />
          </el-form-item>

          <el-form-item label="correo" :label-width="formLabelWidth">
            <el-input v-model="form.correo" autocomplete="off" />
          </el-form-item>

          <el-form-item label="telefono" :label-width="formLabelWidth">
            <el-input v-model="form.telefono" autocomplete="off" />
          </el-form-item>

          <el-form-item label="contrasenia" :label-width="formLabelWidth">
            <el-input v-model="form.contrasenia" autocomplete="off" />
          </el-form-item>
          
          <el-form-item label="sexo" :label-width="formLabelWidth">
            <el-input v-model="form.sexo" autocomplete="off" />
          </el-form-item>

          <el-form-item label="f_registro" :label-width="formLabelWidth">
            <el-input v-model="form.f_registro" autocomplete="off" />
          </el-form-item>  

          <el-form-item label="estado" :label-width="formLabelWidth">
            <el-input v-model="form.estado" autocomplete="off" />
          </el-form-item> 

          <el-form-item label="tipo" :label-width="formLabelWidth">
            <el-input v-model="form.tipo" autocomplete="off" />
          </el-form-item>                           
            <div class="dialog-footer">
              <el-button @click="dialogFormVisible = false">Cancel</el-button>
              <el-button type="primary" @click="enviarProductoActualizado">
                Confirm
              </el-button>
            </div>
      </el-form>
  </el-dialog> 
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { actualizarAdministrador, actualizarUsuario, listadoAdministradores } from '@/apis/api';
import { Edit } from '@element-plus/icons-vue';

const formLabelWidth = '150px';
const dialogFormVisible = ref(false);
const administrador = ref([]);

const form = reactive({
  idAdmin: null,
  nomAdmin: '',
  nombre: '',
  paterno: '',
  materno: '',
  f_nacimiento: '',
  correo: '',
  telefono: '',
  contrasenia: '',
  sexo: '',
  f_registro: '',
  estado: '',
  tipo: '',
  idUsuario: '',
  nombreDeUsuario: ''
});

const mostrarModalDeEdicion = async(objeto) => {
  try {
    form.idAdmin = objeto.idAdmin;
    form.nomAdmin = objeto.nomAdmin;
    form.nombre = objeto.nombre;
    form.paterno = objeto.paterno; 
    form.materno = objeto.materno;
    form.f_nacimiento = objeto.f_nacimiento;
    form.correo = objeto.correo;
    form.telefono = objeto.telefono;
    form.contrasenia = objeto.contrasenia;
    form.sexo = objeto.sexo;
    form.f_registro = objeto.f_registro;
    form.estado = objeto.estado;
    form.tipo = objeto.tipo;
    form.idUsuario = objeto.idUsuario;
    form.nombreDeUsuario = objeto.nombreDeUsuario;
    dialogFormVisible.value = true;
  } catch(error) {
    alert(error);
  }
}

const enviarProductoActualizado = async() => {
  try {
    const objetoAdmin = {
      idAdmin: form.idAdmin,
      nomAdmin: form.nomAdmin
    };

    const objeto = {
      idUsuario: form.idUsuario,
      nombreDeUsuario: form.nombreDeUsuario,
      nombre: form.nombre,
      paterno: form.paterno,
      materno: form.materno,
      f_nacimiento: form.f_nacimiento,
      correo: form.correo,
      telefono: form.telefono,
      contrasenia: form.contrasenia,
      sexo: form.sexo,
      f_registro: form.f_registro,
      estado: form.estado,
      tipo: form.tipo
    };
    
    await actualizarAdministrador(objetoAdmin);
    await actualizarUsuario(objeto);
    
    dialogFormVisible.value = false;
    tablaAdministrador();
  } catch(error) {
    alert(error);
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

const tablaAdministrador = async() => {
  try {
    const resultado = await listadoAdministradores();
    administrador.value = resultado;
  } catch(error) {
    console.error(error);
  }
}

onMounted(tablaAdministrador);
defineExpose({ tablaAdministrador });
</script>

<style scoped>
.agregar {
  position: absolute;
  right: 83px;
  top: 150px;
  width: 130px;
}

img {
  position: absolute;
  width: 155px;
  right: 70px;
  top: -30px;
}

h1 {
  font-size: 50px;
  color: #7a5c38;  
  text-transform: uppercase;
  margin-left: 580px;
}

section {
  width: 1418px;
  margin-left: 50px;
  height: 100%;
  top: 40px;
  background-color: red;
}

p {
  font-size: 28px;
}
</style>