<template>
  <div>
    <v-container>
      <v-layout row align-center>
        <v-flex>
          <tile-button title="Login"></tile-button>
          <tile-button title="Login"></tile-button>
          <tile-button title="Reports"></tile-button>
          <tile-button title="Rooster"></tile-button>
          <tile-button title="Instelingen"></tile-button>
          <tile-button title="Register"></tile-button>
          <tile-button title="Login"></tile-button>
          <tile-button title="Login"></tile-button>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import TileButton from "@/components/TileButton.vue";
export default {
  data() {
    return {};
  },
  components: {
    TileButton
  }
};
</script>

<style scoped>
.tile-buttons {
  width: 20%;
  height: 220px;
}
</style>