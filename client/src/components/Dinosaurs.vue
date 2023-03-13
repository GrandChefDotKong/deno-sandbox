<script setup lang="ts">
  import { ref } from 'vue';

  const response = await fetch("http://localhost:8000/dinosaur");
  const dinosaurs = ref(null);
  dinosaurs.value = await response.json();

</script>

<template>
  <div>
    <ul>
      <li v-for="dino in dinosaurs">
        <h3>
          <router-link 
            :to="{ name: 'details', params: { 
              slug: dino.name.toLowerCase()
            } }"
          >
            {{ dino.name }}
          </router-link>
        </h3>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>