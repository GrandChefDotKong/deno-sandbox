<script setup lang="ts">
  import { ref } from 'vue';
  import { Dinosaur } from '../types/Dinosaur';

  const response = await fetch("http://localhost:8000/dinosaur");
  const dinosaurs = ref<Dinosaur[]>([]);
  dinosaurs.value = await response.json();

</script>

<template>
  <div v-if="dinosaurs">
    <ul>
      <li v-for="dino in dinosaurs" :key="dino.id">
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