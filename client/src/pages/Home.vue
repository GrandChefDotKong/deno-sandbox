<template>
  <div>
    Welcome to Jurassic App
  </div>
  <Suspense>
    <template #default>
      <Dinosaurs />
    </template>
    <template #fallback>
      <div>Loading ...</div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
  import Dinosaurs from '../components/Dinosaurs.vue';

</script>

<style lang="scss" scoped>

</style>