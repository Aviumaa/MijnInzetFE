<template>
  <nav>
    <v-toolbar flat app class="black">
      <v-toolbar-title class="text-uppercase grey--text">
        <router-link :to="{name: 'home'}" class="font-weight-light home">
          Mijn-
          <span class="font-weight-bold">Inzet</span>
        </router-link>
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
    logout() {
      this.eraseCookie("token");
      this.$router.push("login");
      location.reload();
    },
    eraseCookie(name) {
      document.cookie =
        name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
  }
};
</script>

<style>
.home {
  cursor: pointer;
  text-decoration: none;
  color: unset;
}
</style>

