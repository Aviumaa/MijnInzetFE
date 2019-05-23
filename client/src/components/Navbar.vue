<template>
  <nav>
    <v-toolbar flat app class="black">
      <v-toolbar-title class="text-uppercase grey--text">
        <span @click="navigateTo({name: 'home'})" class="font-weight-light home">Mijn-</span>
        <span @click="navigateTo({name: 'home'})">Inzet</span>
      </v-toolbar-title>
        <v-btn v-if="backbutton" @click="back()" flat color="grey">
          <v-icon right>arrow_back</v-icon>
          <span>Terug</span>
        </v-btn>
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
    return {
      backbutton: true 
    }
      
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("login");
    },
    back() {
      console.log("test boolean: " + this.test);
      console.log("routerpath" + this.$route.path);
      this.$router.go(-1);
    },
    setBackButton() {
        if (this.$route.path == "/") {
        return this.backbutton = false;
      } else {
        return this.backbutton = true;
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
.home {
  cursor: pointer;
}
</style>

