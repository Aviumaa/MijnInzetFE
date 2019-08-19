<template class="background">
  <v-container>
    <v-layout row>
      <v-flex class="center">
        <tile-button
          @click.native="navigateTo({name: 'taskList'})"
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
          @click.native="navigateTo({name: 'profile'})"
          title="Mijn"
          newLine="Profiel"
          icon="face"
        ></tile-button>
        <tile-button
          v-if="roleId == 1"
          @click.native="navigateTo({name: 'educationTasks'})"
          title="Taken"
          newLine="Beheren"
          icon="build"
        ></tile-button>
        <tile-button
          v-if="roleId == 1"
          @click.native="navigateTo({name: 'users'})"
          title="Gebruikers"
          icon="group"
        ></tile-button>
        <tile-button
          v-if="roleId == 8"
          @click.native="navigateTo({name: '#'})"
          title="Overzicht inzet"
        ></tile-button>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import TileButton from "@/components/TileButton.vue";

export default {
  data() {
    const roleId = 0;
    return {
      roleId: null
    };
  },
  components: {
    TileButton
  },
  // props: ["token"],
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
          this.roleId = this.token.role;
        }
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

.background {
  background-color: darkblue;
}
</style>
