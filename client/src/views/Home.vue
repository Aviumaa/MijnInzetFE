<template>
  <v-container>
    <v-layout row>
      <v-flex class="center mt-20">
        <tile-button
          @click.native="navigateTo({name: 'reports'})"
          class="teal lighten-1"
          title="Taakoverzicht"
        ></tile-button>
        <tile-button
          @click.native="navigateTo({name: 'reports'})"
          class="teal lighten-1"
          title="Beschikbaarheid"
        ></tile-button>
        <tile-button
          @click.native="navigateTo({name: 'vacancies'})"
          class="teal lighten-1"
          title="Openstaande"
          newLine="vacatures"
        ></tile-button>
        <tile-button
          @click.native="navigateTo({name: 'roster'})"
          class="teal lighten-1"
          title="Mijn"
          newLine="Profiel"
        ></tile-button>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TileButton from "@/components/TileButton.vue";

export default {
  data() {
    return {};
  },
  components: {
    TileButton
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
.tile-buttons {
  width: 220px;
  height: 220px;
}

.center {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.mt-20 {
  margin-top: 50px;
}
</style>
