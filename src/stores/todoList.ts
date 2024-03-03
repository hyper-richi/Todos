import type { Todo } from '@/type';
import { defineStore } from 'pinia';
import axios from 'axios';

interface State {
  todoList: Todo[];
  error: string | null;
}

export const useTodoListStore = defineStore('todoList', {
  state: (): State => ({
    todoList: [],
    error: null
  }),
  actions: {
    async fetchTodos() {
      try {
        const res = await axios.get(`https://3629744318c78c12.mokky.dev/todos`);
        console.log('res: ', res.data);
        if (res.status === 200) {
          this.setData(res.data);
        }
      } catch (error: any) {
        this.error = error.message;
        console.error('Произошла ошибка при получении данных', error);
      }
    },
    async addTodo(text: string) {
      if (text) {
        try {
          const res = await axios.post('https://3629744318c78c12.mokky.dev/todos', {
            title: text,
            done: false
          });
          if (res.status === 201) {
            this.todoList.push(res.data);
          }
        } catch (error: any) {
          this.error = error.message;
          console.error('Произошла ошибка при создании записи', error);
        }
      }
    },
    async toggleTodo(todo: Todo) {
      try {
        const res = await axios.patch(`https://3629744318c78c12.mokky.dev/todos/${todo.id}`, {
          done: !todo.done
        });
      } catch (error: any) {
        this.error = error.message;
        console.error('Произошла ошибка при изменении записи', error);
      }
    },
    async delTodo(todoId: string) {
      try {
        const res = await axios.delete(`https://3629744318c78c12.mokky.dev/todos/${todoId}`);

        if (res.status === 200) {
          this.todoList = this.todoList.filter((todo) => todo.id !== todoId);
        }
      } catch (error: any) {
        this.error = error.message;
        console.error('Произошла ошибка при удалении записи', error);
      }
    },
    async editTodo(id: string, text: string) {
      try {
        const res = await axios.patch(`https://3629744318c78c12.mokky.dev/todos/${id}`, {
          title: text
        });
        if (res.status === 200) {
          const findIdx = this.todoList.findIndex((item) => item.id === id);
          this.todoList.splice(findIdx, 1, res.data);
        }
      } catch (error: any) {
        this.error = error.message;
        console.error('Произошла ошибка при изменении записи', error);
      }
    },
    setData(data: Todo[]) {
      this.todoList = data;
    }
  },
  getters: {
    getTodoList: (state) => state.todoList
  }
});
