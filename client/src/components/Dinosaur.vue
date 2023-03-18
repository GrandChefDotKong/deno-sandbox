<script setup lang="ts">
  import { ref } from 'vue';
  import { Dinosaur } from '../types/Dinosaur';

  const props = defineProps({
    slug: String
  });

  const response = await fetch(`http://localhost:8000/dinosaur/${props.slug}`);
  const dinosaur = ref<Dinosaur>();

  dinosaur.value = await response.json() as Dinosaur;

</script>

<template>
  <h2>
    {{ dinosaur?.name }}
  </h2>
  <h3>
    {{ dinosaur?.period }}
  </h3>
</template>

<style scoped>

</style>