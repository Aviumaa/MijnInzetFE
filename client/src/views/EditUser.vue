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
            <v-text-field ref="salutation" v-model="user.salutation" label="Aanhef" required></v-text-field>
            <v-text-field ref="username" v-model="user.username" label="Gebruikersnaam" required></v-text-field>
            <v-text-field ref="fullName" v-model="user.fullName" label="Volledige naam" required></v-text-field>
            <v-text-field ref="email" v-model="user.email" label="Email" required></v-text-field>
            <v-text-field ref="telephone" v-model="user.telephone" label="Telefoon" required></v-text-field>
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
      <ResponseDialog ref="responseDialog"/>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import HeaderTitle from "@/components/HeaderTitle.vue";
import ResponseDialog from "@/components/ResponseDialog";

export default {
  data: () => ({
    user: [],
    salutation: "",
    username: "",
    fullName: "",
    email: "",
    telephone: "",

    selectedRole: [],
    roles: []
  }),
  components: {
    HeaderTitle,
    ResponseDialog
  },
  methods: {
    send() {
      axios
        .put(
          `http://localhost:3000/api/users/${this.user.id}/update`,
          {
            salutation: this.user.salutation,
            username: this.user.username,
            fullName: this.user.fullName,
            email: this.user.email,
            telephone: this.user.telephone,
            roleId: this.selectedRole.id
          },
          { withCredentials: true }
        )
        .then(response => {
          if (response.status == 200) {
            this.openResponseDialog(response.status);
          }
        })
        .catch(error => {
          if (error.response.status == 400) {
            this.openResponseDialog(error.response.status);
          }
        });
    },
    openResponseDialog(responseStatus) {
      if (responseStatus == 200) {
        this.$refs.responseDialog.open("Gebruiker gewijzigd", "done");
      } else if (responseStatus == 400) {
        this.$refs.responseDialog.open(
          "Wijzigingen zijn niet opgeslagen",
          "clear"
        );
      }
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/roles/", { withCredentials: true })
      .then(response => {
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
