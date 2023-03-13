<template>
  <Suspense>
    <template #default>
      <Dinosaur :slug="slug" />
    </template>
    <template #fallback>
      <div>Loading ...</div>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
  import Dinosaur from '../components/Dinosaur.vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const slug = route.params.slug;

</script>

<style lang="scss" scoped>

</style>