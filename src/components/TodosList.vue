<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

interface Todo {
  id: string;
  title: string;
  done: boolean;
}
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
      <div v-for="todo of todos" class="item" :key="todo.id">
        {{ todo }}
        <button @click="delTodo(todo.id)">x</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style>
.container {
  position: relative;
  padding: 0;
}

.item {
  width: 100%;
  height: 30px;
  background-color: #f3f3f3;
  border: 1px solid #666;
  box-sizing: border-box;
  color: black;
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
