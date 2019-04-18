<template>
  <v-btn
    class="tile-buttons white--text font-weight-bold title mt-5"
    font-weight-bold
    text-md-center
  >
    <br>
    {{title}}
    <br>
    <br>
    {{newLine}}
  </v-btn>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["title", "newLine"]
};
</script>

<style scoped>
.tile-buttons {
  width: 20%;
  height: 220px;
}
</style>