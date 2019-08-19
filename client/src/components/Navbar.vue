<template>
  <nav>
    <v-toolbar flat app class="black" height="56px">
      <v-toolbar-title class="text-uppercase grey--text">
        <router-link :to="{name: 'profile'}" class="font-weight-light home">
          Mijn-
          <span class="font-weight-bold">Inzet</span>
        </router-link>
      </v-toolbar-title>
      <v-btn v-if="backButton" @click="back()" flat color="grey" class="back-button">
        <v-icon right>arrow_back</v-icon>
        <span>Terug</span>
      </v-btn>
      <v-spacer></v-spacer>
      <div>
        <li v-if="!isAuthenticated">
          <v-btn href="#" @click.prevent="login">Login</v-btn>
        </li>
        <li v-if="isAuthenticated">
          <v-btn href="#" @click.prevent="logout">Log out</v-btn>
        </li>
      </div>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  name: "navBar",
  data() {
    return {
      backButton: true,
      isAuthenticated: false
    };
  },
  async created() {
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    login() {
      this.$auth.login();
    },
    logout() {
      this.$auth.logOut();
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
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

