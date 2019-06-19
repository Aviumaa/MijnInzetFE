<template>
  <v-container>
    <v-layout>
      <v-flex>
        <HeaderTitle title="Gebruikers"></HeaderTitle>
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
          text: "ID",
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
          text: "Gebruikersrol",
          sortable: true,
          value: "gebruikersrol",
          class: "px-3"
        }
      ],
      users: []
    };
  },
  components: {
    HeaderTitle,
    UsersDashboard
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/users/all/", {
        withCredentials: true
      })
      .then(response => {
        this.users = response.data;
      });
  }
};
</script>

<style scoped>
</style>
