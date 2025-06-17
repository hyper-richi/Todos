export default {
  data() {
    return {
      count: 0
    };
  },
  mounted() {
    console.log('mounted from mixin');
  },
  methods: {
    onIncrement() {
      this.count += 1;
    }
  }
};
