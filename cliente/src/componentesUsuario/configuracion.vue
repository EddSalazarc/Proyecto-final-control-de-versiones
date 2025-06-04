<template>

   <header>
        <nav>
            <RouterLink :to="direccion('cliente')" class="enlace">Inicio</RouterLink>
            <RouterLink :to="direccion('configuracion')" class="enlace">Configuración</RouterLink>
            <a href="#" class="enlace" @click="handleCerrarSesion">Cerrar sesión</a>
        </nav>
        </header>
        <img src="../../../imagenes/logoFinal.webp" class="logo" alt="">
  <div class="configuracion-container">
    <el-card class="configuracion-card">
      <template #header>
        <div class="card-header">
          <h2>Configuración de Cuenta</h2>
        </div>
      </template>

      <el-form 
        :model="formUsuario" 
        @submit.prevent="actualizarDatos"
        label-position="top"
      >
        <!-- Datos personales -->
        <h3>Datos Personales</h3>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Nombre de Usuario">
              <el-input v-model="formUsuario.nombreDeUsuario" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Nombre">
              <el-input v-model="formUsuario.nombre" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Apellido Paterno">
              <el-input v-model="formUsuario.paterno" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Apellido Materno">
              <el-input v-model="formUsuario.materno" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Fecha de Nacimiento">
              <el-date-picker
                v-model="formUsuario.f_nacimiento"
                type="date"
                placeholder="Seleccione fecha"
                format="YYYY-MM-DD"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Sexo">
              <el-select v-model="formUsuario.sexo" style="width: 100%">
                <el-option label="Masculino" value="M" />
                <el-option label="Femenino" value="F" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- Datos de contacto -->
        <h3>Datos de Contacto</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Correo Electrónico">
              <el-input v-model="formUsuario.correo" type="email" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Teléfono">
              <el-input v-model="formUsuario.telefono" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- Cambio de contraseña -->
        <h3>Cambiar Contraseña</h3>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Nueva Contraseña">
              <el-input 
                v-model="formUsuario.contrasenia" 
                type="password"
                placeholder="Dejar en blanco para mantener la actual"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Confirmar Contraseña">
              <el-input 
                v-model="confirmarContrasenia" 
                type="password"
                placeholder="Confirmar nueva contraseña"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- Botones -->
        <el-form-item>
          <el-button 
            type="primary" 
            native-type="submit" 
            :loading="loading"
            :disabled="!datosValidos"
          >
            Guardar Cambios
          </el-button>
          <el-button @click="cancelarCambios" plain>
            Cancelar
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';

const loading = ref(false);
const confirmarContrasenia = ref('');

const formUsuario = reactive({
  nombreDeUsuario: '',
  nombre: '',
  paterno: '',
  materno: '',
  f_nacimiento: '',
  correo: '',
  telefono: '',
  contrasenia: '',
  sexo: ''
});

// Obtener el nombre de usuario del localStorage o donde lo tengas guardado
//const nombreDeUsuarioActual = localStorage.getItem('nombreDeUsuario');

import { useRoute } from 'vue-router';

const route = useRoute();
const nombre = route.query.cliente;
const nombreDeUsuario = String(nombre);
console.log(nombre);

// Validación de datos
const datosValidos = computed(() => {
  if (!formUsuario.nombreDeUsuario || !formUsuario.nombre || !formUsuario.correo) {
    return false;
  }
  if (formUsuario.contrasenia && formUsuario.contrasenia !== confirmarContrasenia.value) {
    return false;
  }
  return true;
});

// Cargar datos del usuario
const cargarDatosUsuario = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/usuario/${nombre}`);
    const datos = response.data;
    
    // Actualizar el formulario con los datos recibidos
    Object.keys(datos).forEach(key => {
      if (key === 'f_nacimiento') {
        formUsuario[key] = new Date(datos[key]);
      } else {
        formUsuario[key] = datos[key];
      }
    });
  } catch (error) {
    console.error('Error al cargar datos:', error);
    ElMessage.error('Error al cargar los datos del usuario');
  }
};

// Actualizar datos del usuario
const actualizarDatos = async () => {
  if (!datosValidos.value) {
    ElMessage.warning('Por favor, complete todos los campos requeridos correctamente');
    return;
  }

  loading.value = true;

  try {
    const datosActualizados = { ...formUsuario };
    if (!datosActualizados.contrasenia) {
      delete datosActualizados.contrasenia;
    }

    await axios.put(
      `http://localhost:3000/usuario/${nombreDeUsuarioActual}`,
      datosActualizados
    );

    ElMessage.success('Datos actualizados correctamente');
    if (formUsuario.contrasenia) {
      formUsuario.contrasenia = '';
      confirmarContrasenia.value = '';
    }
  } catch (error) {
    console.error('Error al actualizar:', error);
    ElMessage.error('Error al actualizar los datos');
  } finally {
    loading.value = false;
  }
};

const cancelarCambios = () => {
  cargarDatosUsuario();
  formUsuario.contrasenia = '';
  confirmarContrasenia.value = '';
};

// Cargar datos al montar el componente
onMounted(cargarDatosUsuario);
//salir 
import cerrarSesion from '@/componentesAdministrador/vistasAdministrador/cerrarSesion.vue';

async function handleCerrarSesion() {
    try {
        dialog.value = false
        const respuesta = await cerrarSesion()
        ElMessage.success(respuesta.mensaje)
        router.push('/')
    } catch (error) {
        ElMessage.error('Error al cerrar sesión')
    }
}//
function direccion(variable){
    return `/${variable}`
}
</script>

<style scoped>
.configuracion-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.configuracion-card {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  margin: 0;
  color: #7a5c38;
}

h3 {
  color: #7a5c38;
  margin-top: 20px;
  margin-bottom: 15px;
  border-bottom: 2px solid #fee6ac;
  padding-bottom: 5px;
}

.el-form {
  margin-top: 20px;
}

.el-button {
  margin-right: 10px;
}

:deep(.el-form-item__label) {
  font-weight: bold;
}

:deep(.el-input__inner) {
  border-radius: 4px;
}

:deep(.el-button--primary) {
  background-color: #7a5c38;
  border-color: #7a5c38;
}

:deep(.el-button--primary:hover) {
  background-color: #8b6d49;
  border-color: #8b6d49;
}

h1{
    margin-left: 50px;
    font-size: 50px;
    color:#7a5c38;
}
.logo{
    position: absolute;

    width: 155px;
    margin-left: 1350px;
    margin-top: -99px;
   
}
nav{
    position: absolute;
    margin-top: 20px;
}
.enlace{
    margin-left: 120px;
    text-decoration: none;
    color: aliceblue;
    text-transform: uppercase;
    font-family: monospace;
    font-size: 30px;    
}
 header{
    position: relative;
    margin-top: -52px;
    width: 100%;
    height:80px;
    background-color:#7a5c38;
}
</style> 