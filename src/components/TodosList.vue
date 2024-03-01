<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import type { Todo } from '@/type/todo';
import TodoItem from './TodoItem.vue';

const todos = ref([] as Todo[]);

async function getTodos() {
  try {
    const res = await axios.get(`http://localhost:3001/todos`);
    todos.value = res.data;
  } catch (e) {
    console.error('Произошла ошибка при получении данных', e);
  }
}

onMounted(() => {
  console.log('onMounted: ');
  getTodos();
});

const addTodo = async () => {
  try {
    const res = await axios.post('http://localhost:3001/todos', {
      id: `${uuid()}`,
      title: 'this.title',
      done: false
    });
    todos.value = [...todos.value, res.data];
  } catch (e) {
    console.error('Произошла ошибка при создании записи', e);
  }
};
const editTodo = async (todo: Todo) => {
  try {
    const res = await axios.patch(`http://localhost:3001/todos/${todo.id}`, {
      title: `${todo.title}`
    });
    todos.value = [...todos.value, res.data];
  } catch (e) {
    console.error('Произошла ошибка при создании записи', e);
  }
};

const delTodo = async (todoId: string) => {
  try {
    const res = await axios.delete(`http://localhost:3001/todos/${todoId}`);
    todos.value = todos.value.filter((todo) => todo.id !== todoId);
  } catch (e) {
    console.error('Произошла ошибка при удалении записи', e);
  }
};
</script>

<template>
  <div>
    <h1>Todos</h1>
    <button type="button" @click="addTodo">Add todo</button>
    <TransitionGroup tag="ul" name="fade" class="container">
      <TodoItem
        v-for="todo of todos"
        :key="todo.id"
        :todo="todo"
        @delTodo="delTodo"
        @editTodo="editTodo"
      />
    </TransitionGroup>
  </div>
</template>

<style scoped>
.container {
  position: relative;
  padding: 0;
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
