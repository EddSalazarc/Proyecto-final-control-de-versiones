<template>
  <header>
    <img class="imagen-logo" src="../../imagenes/logoFinal.webp" >
    <h1>EL PADRINO</h1>
    <el-button type="warning" plain  class="boton-registrarse" @click="irARegistro">REGISTRARSE</el-button>
  </header>

  <section>
    <img class="imagen-centro" src="../../imagenes/imagenLogin.webp">
    <article>
      <el-form 
        ref="formRef"
        :model="formLogin"
        :rules="rules"
        label-width="auto" 
        style="max-width: 600px"
        @submit.prevent="handleLogin"
      >
        <el-form-item prop="usuario" label="Usuario">
          <el-input 
            v-model="formLogin.usuario" 
            class="inputs" 
            placeholder="Ingrese su usuario"
          />
        </el-form-item>

        <el-form-item prop="contrasenia" label="Contraseña">
          <el-input 
            v-model="formLogin.contrasenia" 
            class="inputs" 
            type="password" 
            placeholder="Ingrese su contraseña"
            show-password
          />
        </el-form-item>

        <el-form-item prop="captcha" label="Código captcha">
          <div class="captcha-container">
            <el-input 
              v-model="formLogin.captcha" 
              class="inputs" 
              placeholder="Ingrese el código captcha"
            />
            <div class="captcha-image" @click="regenerarCaptcha">
              {{ captchaCode }}
            </div>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button 
            class="boton" 
            type="warning" 
            native-type="submit"
            :loading="loading"
          >
            INICIAR SESIÓN
          </el-button>
        </el-form-item>
      </el-form>
    </article>

  </section>

  <el-dialog
    v-model="dialogVisible"
    :title="dialogTitle"
    width="30%"
  >
    <span>{{ dialogMessage }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          Aceptar
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { iniciarSesion, verificarCaptcha } from '../apis/api';

const router = useRouter();
const formRef = ref(null);
const loading = ref(false);
const captchaCode = ref(generarCaptcha());
const dialogVisible = ref(false);
const dialogTitle = ref('');
const dialogMessage = ref('');

const formLogin = reactive({
  usuario: '',
  contrasenia: '',
  captcha: ''
});

const rules = {
  usuario: [
    { required: true, message: 'Por favor ingrese su usuario', trigger: 'blur' },
    { min: 3, message: 'El usuario debe tener al menos 3 caracteres', trigger: 'blur' }
  ],
  contrasenia: [
    { required: true, message: 'Por favor ingrese su contraseña', trigger: 'blur' },
    { min: 6, message: 'La contraseña debe tener al menos 6 caracteres', trigger: 'blur' }
  ],
  captcha: [
    { required: true, message: 'Por favor ingrese el código captcha', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value.toLowerCase() !== captchaCode.value.toLowerCase()) {
          callback(new Error('El código captcha no coincide'));
        } else {
          callback();
        }
      },
      trigger: 'blur'
    }
  ]
};

function generarCaptcha() {
  length = 4
  const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let resultado = '';
  for (let i = 0; i < length; i++) {
    resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return resultado;
}

function regenerarCaptcha() {
  captchaCode.value = generarCaptcha();
  formLogin.captcha = '';
}

function mostrarMensaje(titulo, mensaje) {
  dialogTitle.value = titulo;
  dialogMessage.value = mensaje;
  dialogVisible.value = true;
}

function irARegistro() {
  router.push('/registro');
}

async function handleLogin() {
  if (!formRef.value) return;
  try {
    await formRef.value.validate();
    loading.value = true;
    const credenciales = {
      nombreDeUsuario: formLogin.usuario,
      contrasenia: formLogin.contrasenia
    };

    const respuesta = await iniciarSesion(credenciales);
    
    mostrarMensaje(
      'Éxito',
      'Inicio de sesión exitoso'
    );

    setTimeout(() => {
      if (respuesta.tipo === 'admin') {
        router.push('/');
      } else {
        router.push({
          path: '/cliente',
          query: { cliente: formLogin.usuario }
        });
      }
    }, 1500);
    
  } catch (error) {
    mostrarMensaje(
      'Error', 
      error.message || 'Ha ocurrido un error al iniciar sesión. Por favor intente nuevamente.'
    );
    regenerarCaptcha();
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* cabeza */
header{
  width: 100%;
  height: 130px;
  background-color: #7a5c38;
  position: relative;
}
h1{
  position: absolute;
  top:-70px;
  left:460px;
  font-size: 90px;
  font-family: fantasy;
  letter-spacing: 20px;
  word-spacing: 30px;
  color:#f5f5f5;
}
.imagen-logo{
  margin-top: 5px;
  margin-left:40px;
  width: 150px;
}
.boton-registrarse{
  position: absolute;
  left:1277px;
  top:47px;
  width: 200px;
  height: 30px;
}
section{
  width: 800px;
  height: 570px;
  margin: auto;
  margin-top:25px;
  position: relative;
  background-color: #fee6ac;
  border-radius: 30px;
}
article{
  position: absolute;
  width: 350px;
  height: auto;
  top:90px;
  left: 398px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.boton{
  color:#716040;
  width: 100%;
  margin-top: 20px;
}
.boton:hover,.boton:focus{
  color:#544730;
}
.imagen-centro{
  height: 570px;
  width: 350px;
  border-radius: 30px;
}

.captcha-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.captcha-image {
  background-color: #f0f0f0;
  padding: 8px 15px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 18px;
  letter-spacing: 3px;
  cursor: pointer;
  user-select: none;
  color: #333;
  min-width: 100px;
  text-align: center;
}

.captcha-image:hover {
  background-color: #e0e0e0;
}

.inputs {
  width: 100%;
}
</style>