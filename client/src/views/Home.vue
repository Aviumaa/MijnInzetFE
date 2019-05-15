<template class="background">
  <v-container>
    <v-layout row>
      <v-flex class="center mt-20">
        <tile-button
          @click.native="navigateTo({name: 'reports'})"
          title="Taakoverzicht"
          icon="view_list"
        ></tile-button>
        <tile-button
          @click.native="navigateTo({name: 'availability'})"
          title="Beschikbaarheid"
          icon="event_available"
        ></tile-button>
        <tile-button
          @click.native="navigateTo({name: 'vacancies'})"
          title="Openstaande"
          newLine="vacatures"
          icon="assignment"
        ></tile-button>
        <tile-button @click.native="navigateTo({name: 'roster'})" title="Mijn Profiel" icon="face"></tile-button>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TileButton from "@/components/TileButton.vue";

export default {
  data() {
    return {
      vacancyText: "Hello Vue.\nThis ext.\nAnother line of text.\n"
    };
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

<style>
.center {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.mt-20 {
  margin-top: 50px;
}

.background {
  background-color: darkblue;
}
</style>
