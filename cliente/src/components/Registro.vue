<template>
  <div class="registro-container">
    <el-card class="registro-card">
      <img src="../imagenes/logoFinal.webp" alt="Logo" class="logo">
      <h2>Registro de Usuario</h2>
      
      <el-form :model="formRegistro" @submit.prevent="registrarUsuario">
        <el-form-item label="Nombre de Usuario">
          <el-input 
            v-model="formRegistro.nombreUsuario" 
            placeholder="Ingrese su nombre de usuario"
            :class="{ 'error': errores.nombreUsuario }"
          />
          <span class="error-message" v-if="errores.nombreUsuario">{{ errores.nombreUsuario }}</span>
        </el-form-item>

        <el-form-item label="Correo Electrónico">
          <el-input 
            v-model="formRegistro.correo" 
            type="email"
            placeholder="Ingrese su correo electrónico"
            :class="{ 'error': errores.correo }"
          />
          <span class="error-message" v-if="errores.correo">{{ errores.correo }}</span>
        </el-form-item>

        <el-form-item label="Contraseña">
          <el-input 
            v-model="formRegistro.password" 
            type="password"
            placeholder="Ingrese su contraseña"
            :class="{ 'error': errores.password }"
            @input="evaluarPassword"
          />
          <div class="password-strength">
            <div class="strength-bar">
              <div :class="['strength-indicator', passwordStrength.class]" :style="{ width: passwordStrength.percentage + '%' }"></div>
            </div>
            <span :class="['strength-text', passwordStrength.class]">{{ passwordStrength.text }}</span>
          </div>
          <span class="error-message" v-if="errores.password">{{ errores.password }}</span>
        </el-form-item>

        <el-form-item label="Confirmar Contraseña">
          <el-input 
            v-model="formRegistro.confirmPassword" 
            type="password"
            placeholder="Confirme su contraseña"
            :class="{ 'error': errores.confirmPassword }"
          />
          <span class="error-message" v-if="errores.confirmPassword">{{ errores.confirmPassword }}</span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading">
            Registrarse
          </el-button>
          <el-button @click="volverLogin" plain>
            Volver al Login
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

const router = useRouter();
const loading = ref(false);

const formRegistro = reactive({
  nombreUsuario: '',
  correo: '',
  password: '',
  confirmPassword: ''
});

const errores = reactive({
  nombreUsuario: '',
  correo: '',
  password: '',
  confirmPassword: ''
});

const passwordStrength = reactive({
  score: 0,
  text: '',
  class: '',
  percentage: 0
});

const evaluarPassword = () => {
  const password = formRegistro.password;
  let score = 0;
  let checks = {
    length: false,
    lowercase: false,
    uppercase: false,
    numbers: false,
    special: false
  };

  // Verificar longitud
  if (password.length >= 8) {
    score += 20;
    checks.length = true;
  }

  // Verificar minúsculas
  if (/[a-z]/.test(password)) {
    score += 20;
    checks.lowercase = true;
  }

  // Verificar mayúsculas
  if (/[A-Z]/.test(password)) {
    score += 20;
    checks.uppercase = true;
  }

  // Verificar números
  if (/[0-9]/.test(password)) {
    score += 20;
    checks.numbers = true;
  }

  // Verificar caracteres especiales
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 20;
    checks.special = true;
  }

  // Actualizar indicador de fortaleza
  passwordStrength.score = score;
  passwordStrength.percentage = score;

  if (score < 40) {
    passwordStrength.text = 'Débil';
    passwordStrength.class = 'weak';
  } else if (score < 80) {
    passwordStrength.text = 'Intermedia';
    passwordStrength.class = 'medium';
  } else {
    passwordStrength.text = 'Fuerte';
    passwordStrength.class = 'strong';
  }
};

const validarFormulario = () => {
  let isValid = true;
  
  // Validar nombre de usuario
  if (!formRegistro.nombreUsuario) {
    errores.nombreUsuario = 'El nombre de usuario es requerido';
    isValid = false;
  } else if (formRegistro.nombreUsuario.length < 3) {
    errores.nombreUsuario = 'El nombre de usuario debe tener al menos 3 caracteres';
    isValid = false;
  } else {
    errores.nombreUsuario = '';
  }

  // Validar correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formRegistro.correo) {
    errores.correo = 'El correo electrónico es requerido';
    isValid = false;
  } else if (!emailRegex.test(formRegistro.correo)) {
    errores.correo = 'Ingrese un correo electrónico válido';
    isValid = false;
  } else {
    errores.correo = '';
  }

  // Validar contraseña
  if (!formRegistro.password) {
    errores.password = 'La contraseña es requerida';
    isValid = false;
  } else if (formRegistro.password.length < 8) {
    errores.password = 'La contraseña debe tener al menos 8 caracteres';
    isValid = false;
  } else if (passwordStrength.score < 40) {
    errores.password = 'La contraseña es demasiado débil';
    isValid = false;
  } else {
    errores.password = '';
  }

  // Validar confirmación de contraseña
  if (!formRegistro.confirmPassword) {
    errores.confirmPassword = 'Debe confirmar la contraseña';
    isValid = false;
  } else if (formRegistro.password !== formRegistro.confirmPassword) {
    errores.confirmPassword = 'Las contraseñas no coinciden';
    isValid = false;
  } else {
    errores.confirmPassword = '';
  }

  return isValid;
};

const registrarUsuario = async () => {
  if (!validarFormulario()) {
    return;
  }

  loading.value = true;

  try {
    // Aquí iría la llamada a la API para registrar el usuario
    const response = await fetch('http://localhost:3000/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombreUsuario: formRegistro.nombreUsuario,
        correo: formRegistro.correo,
        password: formRegistro.password
      })
    });

    if (response.ok) {
      ElMessage.success('Usuario registrado exitosamente');
      router.push('/login');
    } else {
      const error = await response.json();
      ElMessage.error(error.message || 'Error al registrar usuario');
    }
  } catch (error) {
    console.error('Error:', error);
    ElMessage.error('Error al conectar con el servidor');
  } finally {
    loading.value = false;
  }
};

const volverLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
.registro-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.registro-card {
  width: 400px;
  padding: 20px;
}

.logo {
  width: 150px;
  margin: 0 auto 20px;
  display: block;
}

h2 {
  text-align: center;
  color: #7a5c38;
  margin-bottom: 30px;
}

.error {
  border-color: #ff4949;
}

.error-message {
  color: #ff4949;
  font-size: 12px;
  margin-top: 5px;
}

.password-strength {
  margin-top: 10px;
}

.strength-bar {
  height: 5px;
  background-color: #eee;
  border-radius: 3px;
  overflow: hidden;
}

.strength-indicator {
  height: 100%;
  transition: width 0.3s ease;
}

.strength-indicator.weak {
  background-color: #ff4949;
}

.strength-indicator.medium {
  background-color: #e6a23c;
}

.strength-indicator.strong {
  background-color: #67c23a;
}

.strength-text {
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.strength-text.weak {
  color: #ff4949;
}

.strength-text.medium {
  color: #e6a23c;
}

.strength-text.strong {
  color: #67c23a;
}

.el-button {
  width: 100%;
  margin-top: 10px;
}
</style> 