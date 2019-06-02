<template>
  <div>
    <panel title="Login">
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-text-field
            class="mb-2 required"
            name="username"
            v-model="user.username"
            placeholder="Username"
            :rules="userNameRules"
            required
          ></v-text-field>
          <v-text-field
            type="password"
            name="password"
            v-model="user.password"
            placeholder="Password"
            :rules="passwordRules"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="login()">Login</v-btn>
      </v-card-actions>
    </panel>
  </div>
</template>

<script>
import axios from "axios";
import Panel from "@/components/Panel.vue";
import TileButton from "@/components/TileButton.vue";

const jwt = require('jsonwebtoken');

axios.defaults.withCredentials = true;

export default {
  data() {
    return {
      valid: false,
      response: [],
      errors: [],
      user: {
        username: "",
        password: ""
      },
      userNameRules: [v => !!v || "Name is required"],
      passwordRules: [v => !!v || "Password is required"]
    };
  },

  methods: {
    login() {
      axios.defaults.withCredentials = true;
      if (this.$refs.form.validate()) {
        this.valid = true;

        axios
          .post(
            `http://localhost:3000/api/users/login`,
            {
              username: this.user.username,
              password: this.user.password
            },
            { withCredentials: true }
          )
          .then(response => {
            if (response.status == "200") {
              window.location = "/dashboard";
            } else {
              // invalid credentials
            }
          })
          .catch(e => {
            this.errors.push(e);
          });
      } else {
        return;
      }
    }
  },
  components: {
    Panel
  },
  mounted(){
    window.addEventListener('keydown', (e) => {
      if (e.key == 'Enter') {
        this.login();
      }
    });
  }
};
</script>

<style>
</style>
