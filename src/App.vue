<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

const textColor = ref('#fff');

// Функция для проверки текущей темы
const checkTheme = () => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  textColor.value = isDarkMode ? '#fff' : '#000'; // Устанавливаем цвет текста в зависимости от темы
};

// Проверяем тему при загрузке страницы
onMounted(() => {
  checkTheme();

  // Добавляем слушатель на изменение темы
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkTheme);
});
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <nav>
        <RouterLink to="/" :style="{ color: textColor }">Home</RouterLink>
        <RouterLink to="/todo" :style="{ color: textColor }">Todo</RouterLink>
        <RouterLink to="/examples" :style="{ color: textColor }">Examples</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.header {
  margin: 24px 0;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  text-decoration: none;
  transition: 0.4s;
  padding: 3px;
}

nav a:hover {
  color: hsla(160, 100%, 37%, 1);
}

nav a.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
  color: hsla(160, 100%, 37%, 1);
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
