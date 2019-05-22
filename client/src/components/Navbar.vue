<template>
  <nav>
    <v-toolbar flat app class="black">
      <v-toolbar-title class="text-uppercase grey--text">
        <span @click="navigateTo({name: 'home'})" class="font-weight-light home">Mijn-</span>
        <span @click="navigateTo({name: 'home'})" class="home">Inzet</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-if="['home', 'availability', 'vacancies', 'createvacancy'].includes($route.name)"
        flat
        color="grey"
        @click="logout()"
      >
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  name: "navBar",
  data() {
    return {};
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("login");
    }
  }
};
</script>

<style>
.home {
  cursor: pointer;
}
</style>

