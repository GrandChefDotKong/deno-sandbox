<script setup lang="ts">
  import { ref } from 'vue';

  const props = defineProps({
    slug: String
  });

  const response = await fetch(`http://localhost:8000/dinosaur/${props.slug}`);
  const dinosaur = ref({});

  dinosaur.value = await response.json();

</script>

<template>
  <h2>
    {{ dinosaur.name }}
  </h2>
  <h3>
    {{ dinosaur.period }}
  </h3>
</template>

<style scoped>

</style>