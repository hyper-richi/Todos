<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import type { Todo } from '@/type/todo';
import TodoItem from './TodoItem.vue';
import { useTodoListStore } from '@/stores/todoList';
import { storeToRefs } from 'pinia';

const todos = ref([] as Todo[]);
const store = useTodoListStore();
const { todoList } = storeToRefs(store);
const text = ref('');

onMounted(() => {
  store.fetchTodos();
});




</script>

<template>
  <div class="todo">
    <h1 class="todo__title">Todos</h1>
    <div class="todo__input">
      <input
        type="text"
        v-model="text"
        class="input"
        placeholder="Add a new todo..."
        @keyup.enter="store.addTodo(text)"
      />
      <button class="todo__button" type="button" @click="store.addTodo(text)">Add todo</button>
    </div>
    <TransitionGroup tag="div" name="fade" class="container">
      <TodoItem
        v-for="todo of todoList"
        :key="todo.id"
        :todo="todo"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.todo {
  background-color: #1f2937;
  padding: 24px;
  margin: 0 24px;
  border-radius: 8px;
  max-width: 512px;
  width: 100%;
}

.todo__title {
  color: #ffffff;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
}

.todo__input {
  display: flex;
  margin-bottom: 24px;
}
.input {
  color: #ffffff;
  padding: 8px;
  border: 2px solid #9ca3af;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  flex-grow: 1;
  background-color: #374151;
}

.input:focus-visible {
  outline: none;
}

.input::placeholder {
  color: #9ca3af;
}

.todo__button {
  cursor: pointer;
  color: #ffffff;
  padding-right: 24px;
  padding-left: 24px;
  background-color: #3b82f6;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  text-transform: none;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
}
.todo__button:hover {
  background-color: #186bf4;
}
.todo__button:active {
  background-color: #3b82f6;
}
.todo__button:focus-visible {
  outline: none;
}
.container {
  position: relative;
  padding: 0;
  gap: 10px;
  display: flex;
  flex-direction: column;
}

/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}
</style>
@/stores/todoList
