<template>
  <button @click="onIncrement">Count is: {{ count }}</button>
</template>

<script>
import CounterMixin from '../mixins/CounterMixin';
export default {
  name: 'CounterOptions',
  mixins: [CounterMixin],

  // lifecycle hooks
  mounted() {
    console.log(`The initial CounterOptions.`);
  }
};
</script>
