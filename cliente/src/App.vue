<template>
  <section>

    <!-- <login></login>  -->
    <NavegadorDelAdministrador></NavegadorDelAdministrador>
    <RouterView></RouterView>
  </section>
</template>

<script setup>
import NavegadorDelAdministrador from './componentesAdministrador/navegadorDelAdministrador.vue';
import login from './navegadorPrincipal/login.vue';
NavegadorDelAdministrador
</script>

<style scoped>

</style>
