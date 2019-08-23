<template class="background">
  <v-container>
    <v-layout row>
      <v-flex class="center">
        <tile-button
          @click.native="navigateTo({name: 'tasks'})"
          title="Taakoverzicht"
          icon="view_list"
        ></tile-button>
        <tile-button
          @click.native="navigateTo({name: 'schedule'})"
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
          v-if="userRoles.includes('admin')"
          @click.native="navigateTo({name: 'educationTasks'})"
          title="Taken"
          newLine="Beheren"
          icon="build"
        ></tile-button>
        <tile-button
          v-if="userRoles.includes('admin')"
          @click.native="navigateTo({name: 'users'})"
          title="Gebruikers"
          icon="group"
        ></tile-button>
        <tile-button
          v-if="userRoles.includes('coordinator')"
          @click.native="navigateTo({name: '#'})"
          title="Overzicht inzet"
        ></tile-button>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TileButton from "@/components/TileButton.vue";

export default {
  data() {
    return {
      userRoles: []
    };
  },
  components: {
    TileButton
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    getUserRole() {
      const user = Object.values(this.$auth.profile)[1];
      this.userRoles = user.roles;
    }
  },
  mounted() {
    this.getUserRole();
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
