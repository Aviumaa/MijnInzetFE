<template>
  <nav>
    <v-toolbar flat app class="black">
      <v-toolbar-title class="text-uppercase grey--text">
        <span @click="navigateTo({name: 'home'})" class="font-weight-light home">Mijn-</span>
        <span @click="navigateTo({name: 'home'})">Inzet</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat color="grey" @click="logout()">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
      <v-btn @click="navigateTo({name: 'login'})" flat color="grey">
        <span>Login</span>
        <v-icon @click="navigateTo({name: 'login'})" right>perm_identity</v-icon>
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

