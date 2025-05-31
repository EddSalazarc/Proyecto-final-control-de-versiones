<template>
  <header>
    <img class="imagen-logo" src="../../imagenes/logoFinal.webp" alt="">
    <h1>EL PADRINO</h1>
       <n-button class="boton-registrarse">REGISTRARSE</n-button>
  </header>
  <section>

    <img class="imagen-centro" src="../../imagenes/imagenLogin.webp" alt="">
    <n-form  ref="" :model="x" :rules="x">
      <article>
        <n-form-item path="age" label="Usuario">
          <n-input  class="inputs" placeholder="" v-model:value="x" />
        </n-form-item>

        <n-form-item path="xx" label="Contraseña">
          <n-input  class="inputs" placeholder="" v-model:value="xx"  type="password" />
        </n-form-item>

       
        <n-form-item path="xx" label="codigo captcha">
          <n-input class="inputs" placeholder="" v-model:value="xx"  type="text" />
        </n-form-item>

        <n-button class="boton" strong secondary type="warning" >
            iniciar sesion      
        </n-button>
        
      </article>
          
    </n-form>
  </section>
</template>

<script setup>






</script>









<style scoped>
/* cabeza */
header{
  width: 100%;
  height: 120px;
  background-color: #7a5c38;
  position: relative;
}
h1{
  position: absolute;
  top:-90px;
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
.registrarse{
  position: absolute;
  color: #f5f5f5;
  left:760px;
  top:45px;
  font-size: 20px;
}
.boton-registrarse{
  position: absolute;
  color: #f5f5f5;
  left:1277px;
  top:47px;
  width: 200px;
  height: 30px;
}
/* medio */
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
  height: 300px;
  top:90px;
  left: 398px;
}
.boton{
  color:#716040;
  width: 350px;
}
.boton:hover,.boton:focus{
  color:#544730;
}
.imagen-centro{
  height: 570px;
  width: 350px;
  border-radius: 30px;

}
/* ::v-deep(.n-input__input):active{
    border:2px;
  border-style: solid;
  border-color: red;
} */



</style>
<!-- ///	Botón con native-type="submit" -->