<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <br>
      <v-flex>
        <HeaderTitle title="Gebruiker wijzigen"></HeaderTitle>
      </v-flex>
      <v-form ref="form">
        <v-card>
          <v-card-text>
            <v-text-field ref="username" v-model="user.username" label="Gebruikersnaam" required></v-text-field>
            <v-combobox
              v-model="selectedRole"
              :items="roles"
              item-text="name"
              label="Selecteer een rol"
              required
            ></v-combobox>
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="send()">Versturen</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import HeaderTitle from "@/components/HeaderTitle.vue";
import axios from "axios";

export default {
  data: () => ({
    user: [],
    username: "",
    selectedRole: [],
    roles: []
  }),
  components: {
    HeaderTitle
  },
  methods: {
    send() {
      axios
        .put(`http://localhost:3000/api/users/${this.user.id}/edit`, {
          username: this.user.username,
          roleId: this.selectedRole.id
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    axios.get("http://localhost:3000/api/roles/").then(response => {
      for (let i = 0; i < response.data.length; i++) {
        let role = response.data[i];
        this.roles.push(role);
      }
    });

    this.user = this.$route.params.user;

    for (let i = 0; i < this.user.roles.length; i++) {
      let role = this.user.roles[i];
      this.selectedRole.push(role.name);
    }
  }
};
</script>
