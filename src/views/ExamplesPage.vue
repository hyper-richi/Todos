<script setup lang="ts">
import CounterOptions from '../components/CounterOptions.vue';
</script>

<template>
  <div class="home">
    <h1 class="home__title">This is an Examples page</h1>
    <div class="home__wrapper">
      <div class="stack__list">
        <h2 class="stack__title">Примеры:</h2>
        <CounterOptions />
      </div>
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

  @media screen and (max-width: 820px) {
    flex-direction: column;
    align-items: center;
  }
}

.home__img {
  max-width: 500px;
  width: 100%;
}

.stack__title {
  font-weight: 700;
}
</style>
