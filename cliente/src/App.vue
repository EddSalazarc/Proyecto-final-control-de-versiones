<template>
  <section>
    <NavegadorDelAdministrador v-if="mostrarNav" />
    <RouterView />
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NavegadorDelAdministrador from './componentesAdministrador/navegadorDelAdministrador.vue';

const route = useRoute();

const mostrarNav = computed(() => {
  return route.path !== '/login' && route.path !== '/registro';
});

</script>

<style scoped>
section {
  min-height: 100vh;
}
</style>
