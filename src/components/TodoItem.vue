<script setup lang="ts">
import type { Todo } from '@/type';

interface Props {
  todo: Todo;
}
defineProps<Props>();

const emit = defineEmits<{ (e: 'delTodo', id: string): void; (e: 'editTodo', todo: Todo): void }>();
</script>
<template>
  <div class="item">
    <input class="toggle" type="checkbox" />
    <label @dblclick="emit('editTodo', todo)">{{ todo.title }}</label>
    <button class="delete" @click="emit('delTodo', todo.id)"></button>
  </div>
</template>

<style scoped>
.item {
  width: 100%;
  background-color: #f3f3f3;
  border: 1px solid #666;
  box-sizing: border-box;
  color: black;
  position: relative;
  font-size: 24px;
}

.item .delete {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #949494;
  transition: color 0.2s ease-out;
}

.item .delete:hover,
.item .delete:focus {
  color: #c18585;
}

.item .delete:after {
  content: '×';
  display: block;
  height: 100%;
  line-height: 1.1;
}

.item:hover .delete {
  display: block;
}

.item label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  font-weight: 400;
  color: #484848;
}

.toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
}
</style>
