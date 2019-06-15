<template>
  <nav>
    <v-toolbar flat app class="black" height="56px">
      <v-toolbar-title class="text-uppercase grey--text">
        <router-link :to="{name: 'home'}" class="font-weight-light home">
          Mijn-
          <span class="font-weight-bold">Inzet</span>
        </router-link>
      </v-toolbar-title>
      <v-btn v-if="backButton" @click="back()" flat color="grey" class="back-button">
        <v-icon right>arrow_back</v-icon>
        <span>Terug</span>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-if="[
          'home', 'availability', 'vacancies', 'createvacancy', 'profile',
          'educationTasks', 'nonEducationTasks', 'editEducation', 'editNonEducationTasks', 
          'users', 'editUser', 
          ].includes($route.name)"
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
    return {
      backButton: true
    };
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
    },
    back() {
      this.$router.go(-1);
    },
    setBackButton() {
      if (this.$route.path == "/dashboard" || this.$route.path == "/") {
        return (this.backButton = false);
      } else {
        return (this.backButton = true);
      }
    }
  },
  mounted: function() {
    this.setBackButton();
  },
  watch: {
    $route: function() {
      this.setBackButton();
    }
  }
};
</script>

<style>
@media (max-width: 960px) {
  .navbar {
    height: 64px;
  }

  .back-button {
    display: none;
  }
}

.home {
  cursor: pointer;
  text-decoration: none;
  color: unset;
}
</style>

