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
        <tile-button
          @click.native="navigateTo({name: 'roster'})"
          title="Mijn"
          newLine="Profiel"
          icon="face"
        ></tile-button>
        <tile-button
          v-if="roleId == 1"
          @click.native="navigateTo({name: '#'})"
          title="Onderwijs"
          newLine="programma beheren"
          icon="build"
        ></tile-button>
        <tile-button
          v-if="roleId == 3 ||
                roleId == 4 ||
                roleId == 5"
          @click.native="navigateTo({name: '#'})"
          title="Overzicht inzet"
        ></tile-button>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TileButton from "@/components/TileButton.vue";
import axios from "axios";

export default {
  data() {
    return {
      roleId: null
    };
  },
  components: {
    TileButton
  },
  props: ["token"],
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  },
  mounted() {
    axios
      .get(`http://localhost:3000/api/users/`, {
        withCredentials: true
      })
      .then(response => {
        if (response.data != null) {
          this.roleId = this.token;
        }
      })
      .catch(e => {
        console.log(e);
        //this.errors.push(e);
      });
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
