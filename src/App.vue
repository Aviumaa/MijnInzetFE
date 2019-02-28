<template>
  <v-app>
    <v-toolbar app dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>MIJN</span>
        <span class="font-weight-light">-INZET</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <Login/>
    </v-content>
  </v-app>
</template>

<script>
import Login from "./components/Login";

export default {
  name: "App",
  components: {
    Login
  },
  data() {
    return {
      //
    };
  }
};
</script>
