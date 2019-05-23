<template>
  <div>
    <panel title="Login">
      <v-card-text>
        <v-form>
          <v-text-field
            class="mb-2"
            type="text"
            name="username"
            v-model="user.username"
            placeholder="Username"
          ></v-text-field>
          <v-text-field
            type="password"
            name="password"
            v-model="user.password"
            placeholder="Password"
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
      console.log(this.user);
      axios.defaults.withCredentials = true;

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
          // JSON responses are automatically parsed.
          // console.log("response: " + response.data);
          if (response.status == "200") {
            // success
            // window.localStorage.setItem("token", response.data);
            window.location = "/dashboard";
          } else {
            // invalid credentials
          }
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  components: {
    Panel
  }
};
</script>

<style>
</style>
