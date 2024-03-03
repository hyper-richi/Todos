<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import type { Todo } from '@/type/todo';
import TodoItem from './TodoItem.vue';

const todos = ref([] as Todo[]);

const text = ref('');

onMounted(() => {
  getTodos();
});

const getTodos = async () => {
  try {
    const res = await axios.get(`https://3629744318c78c12.mokky.dev/todos`);
    todos.value = res.data;
  } catch (e) {
    console.error('Произошла ошибка при получении данных', e);
  }
};

const addTodo = async () => {
  if (text.value) {
    try {
      const res = await axios.post('https://3629744318c78c12.mokky.dev/todos', {
        title: text.value,
        done: false
      });
      text.value = '';
      if (res.status === 201) {
        todos.value = [...todos.value, res.data];
      }
    } catch (e) {
      console.error('Произошла ошибка при создании записи', e);
    }
  }
};

const toggleTodo = async (todo: Todo) => {
  try {
    const res = await axios.patch(`https://3629744318c78c12.mokky.dev/todos/${todo.id}`, {
      done: !todo.done
    });
    if (res.status === 201) {
      todos.value = res.data;
    }
  } catch (e) {
    console.error('Произошла ошибка при создании записи', e);
  }
};

const editTodo = async (id: string, text: string) => {
  try {
    const res = await axios.patch(`https://3629744318c78c12.mokky.dev/todos/${id}`, {
      title: text
    });

    if (res.status === 200) {
      const findIdx = todos.value.findIndex((item) => item.id === id);
      todos.value.splice(findIdx, 1, res.data);
    }
  } catch (e) {
    console.error('Произошла ошибка при изменении записи', e);
  }
};

const delTodo = async (todoId: string) => {
  try {
    const res = await axios.delete(`https://3629744318c78c12.mokky.dev/todos/${todoId}`);

    if (res.status === 200) {
      todos.value = todos.value.filter((todo) => todo.id !== todoId);
    }
  } catch (e) {
    console.error('Произошла ошибка при удалении записи', e);
  }
};
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
        @keyup.enter="addTodo"
      />
      <button class="todo__button" type="button" @click="addTodo">Add todo</button>
    </div>
    <TransitionGroup tag="div" name="fade" class="container">
      <TodoItem
        v-for="todo of todos"
        :key="todo.id"
        :todo="todo"
        @delTodo="delTodo"
        @editTodo="editTodo"
        @toggleTodo="toggleTodo"
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
