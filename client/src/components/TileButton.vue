<template>
  <v-btn class="tile-buttons black--text font-weight-bold title mt-5 text-md-center">
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

<style>
.tile-buttons.v-btn:not(.v-btn--depressed):not(.v-btn--flat) {
-webkit-box-shadow: 8px 11px 0px -2px rgba(0,0,0,0.37);
-moz-box-shadow: 8px 11px 0px -2px rgba(0,0,0,0.37);
box-shadow: 8px 11px 0px -2px rgba(0,0,0,0.37);
}
</style>