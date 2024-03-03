<script setup lang="ts">
import type { Todo } from '@/type';
import { ref } from 'vue';

interface Props {
  todo: Todo;
}
const editedTodo = ref();
const text = ref('');

const { todo } = defineProps<Props>();
const checked = ref(todo.done);

const emit = defineEmits<{
  (e: 'delTodo', id: string): void;
  (e: 'editTodo', id: string, text: string): void;
  (e: 'toggleTodo', todo: Todo): void;
}>();

let beforeEditCache = '';

function editTodo(todo: Todo) {
  beforeEditCache = todo.title;
  text.value = todo.title;
  editedTodo.value = todo;
}

function doneEdit(todo: Todo) {
  if (editedTodo.value) {
    editedTodo.value = null;
    emit('editTodo', todo.id, text.value);
    if (!todo.title) {
      emit('delTodo', todo.id);
    }
  }
}

function cancelEdit() {
  editedTodo.value = null;
}
</script>
<template>
  <div class="item" :class="{ completed: checked, editing: todo === editedTodo }">
    <input class="toggle" type="checkbox" v-model="checked" @change="emit('toggleTodo', todo)" />
    <input
      class="edit"
      type="text"
      v-if="todo === editedTodo"
      v-model="text"
      @keyup.enter="doneEdit(todo)"
      @keyup.escape="cancelEdit"
      @blur="doneEdit(todo)"
      @vue:mounted="({ el }: any) => el.focus()"
    />
    <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
    <button class="delete" @click="emit('delTodo', todo.id)">X</button>
  </div>
</template>

<style scoped>
.item {
  width: 100%;
  background-color: #374151;
  box-sizing: border-box;
  color: #ffffff;
  position: relative;
  display: flex;
  padding: 16px;
  font-size: 16px;

  border-radius: 6px;
  align-items: center;
  display: flex;
  gap: 8px;
}

.item .delete {
  color: #c18585;
  transition: color 0.2s ease-out;
  margin-left: 8px;
  text-transform: none;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  border-radius: 0;
  background-color: transparent;
  background-image: none;
  padding: 0;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
  cursor: pointer;
}

.item .delete:hover {
  color: red;
}
.item .delete:active {
  color: red;
}

.item label {
  word-break: break-all;
  flex-grow: 1;
  transition: color 0.4s;
  font-weight: 400;
  color: #fff;
}

.item.completed label {
  color: #949494;
  text-decoration: line-through;
}

.item.editing label {
  display: none;
}

.toggle {
  text-align: center;
  width: 25px;
  height: 25px;
  position: relative;
  cursor: pointer;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none;
  -webkit-appearance: none;
  appearance: none;
}
.toggle:before {
  content: '';
  display: block;
  position: absolute;
  width: 25px;
  height: 25px;
  top: 0;
  left: 0;
  background-color: #e9e9e9;
  border-radius: 3px;
}
.toggle:checked:before {
  content: '';
  display: block;
  position: absolute;
  width: 25px;
  height: 25px;
  top: 0;
  left: 0;
  background-color: #1e80ef;
  border-radius: 3px;
}

.toggle:checked:after {
  content: '';
  display: block;
  width: 7px;
  height: 18px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: 2px;
  left: 10px;
}

.edit {
  margin: 0;
  width: 100%;
  font-family: inherit;
  font-weight: inherit;
  border: none;
  border-bottom: 1px solid #999;
  background-color: #374151;
  font-size: 16px;

  color: #ffffff;
  width: 100%;
}

.edit:focus-visible {
  outline: none;
}

.edit::placeholder {
  color: #9ca3af;
}

/* .edit {
  display: none;
} */

.editing .edit {
  display: block;
}
</style>
