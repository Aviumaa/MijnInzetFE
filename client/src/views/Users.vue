<template>
  <v-container>
    <v-layout>
      <v-flex>
        <HeaderTitle title="Users"></HeaderTitle>
        <UsersDashboard :headers="headers" :content="users"></UsersDashboard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HeaderTitle from "@/components/HeaderTitle.vue";
import UsersDashboard from "@/components/UsersDashboard.vue";
import axios from "axios";

export default {
  data() {
    return {
      headers: [
        {
          text: "Id",
          sortable: true,
          value: "id",
          width: "15%",
          class: "px-3"
        },
        {
          text: "Gebruikersnaam",
          sortable: true,
          value: "gebruikersnaam",
          class: "px-3"
        },
        {
          text: "Rollen",
          sortable: true,
          value: "rollen",
          width: "10%",
          class: "px-3"
        }
      ],
      content: [],
      users: []
    };
  },
  components: {
    HeaderTitle,
    UsersDashboard
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/users/")// dit wordt nadat login werkt gewijzigd naar users
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
</style>
