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
  display: flex;
  padding: 10px;
  border-radius: 5px;
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
  padding: 15px 15px 15px 20px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  font-weight: 400;
  color: #484848;
}

.toggle {
  text-align: center;
  width: 30px;
  height: 30px;
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
  width: 30px;
  height: 30px;
  top: 0;
  left: 0;
  background-color: #e9e9e9;
  border-radius: 3px;
}
.toggle:checked:before {
  content: '';
  display: block;
  position: absolute;
  width: 30px;
  height: 30px;
  top: 0;
  left: 0;
  background-color: #1e80ef;
  border-radius: 3px;
}

.toggle:checked:after {
  content: '';
  display: block;
  width: 10px;
  height: 20px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: 2px;
  left: 10px;
}
</style>
