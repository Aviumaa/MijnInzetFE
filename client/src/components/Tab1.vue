<template>
  <div>
    <H1>Tab1</H1>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tabs: null,
      headers: ["Onderwijstaken", "Niet onderwijstaken"]
    };
  },
  methods: {
    mounted() {
      console.log('testtestets');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>