<script setup lang="ts">
import TodosList from '../components/TodosList.vue';
</script>
<template>
  <main>
    <div class="container">
      <TodosList />
    </div>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
