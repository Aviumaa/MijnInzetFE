<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="dark">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <span>Source</span>
            </v-tooltip>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <input type="text" name="username" v-model="user.username" placeholder="Username">
              <input type="password" name="password" v-model="user.password" placeholder="Password">
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login()">Login</v-btn>
            <h3>{{ response }}</h3>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      response: [],
      errors: [],

      user: {
        username: "",
        password: ""
      }
    };
  },

  methods: {
    login() {
      var params = new URLSearchParams();
      params.append("username", this.user.username);
      params.append("password", this.user.password);
      console.log(this.user.username);

      axios
        .post(`http://localhost:8080/api/login`, params)
        .then(response => {
          // JSON responses are automatically parsed.
          this.response = response.data;
          console.log(response);
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>

<style>
</style>
