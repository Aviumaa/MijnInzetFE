<template>
  <v-btn class="tile-buttons white--text">{{title}}</v-btn>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["title"]
};
</script>

<style scoped>
.tile-buttons {
  width: 20%;
  height: 220px;
}
</style>