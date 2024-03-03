<script setup lang="ts">
import ListStack from '../components/ListStack.vue';
</script>

<template>
  <div class="home">
    <h1 class="home__title">This is an Home page</h1>
    <div class="home__wrapper">
      <div class="stack__list">
        <h2 class="stack__title">Stack на проекте:</h2>
        <ListStack />
      </div>
      <img src="../assets/home.svg" alt="" />
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home__title {
  font-size: 36px;
  font-weight: 700;
  text-align: center;
  color: #fff;
  margin: 24px 0;
}

.home__wrapper {
  width: 100%;
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.stack__list {
  min-width: 255px;
}

.stack__title {
  font-weight: 700;
}
</style>
