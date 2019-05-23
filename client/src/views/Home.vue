<template class="background">
  <v-container>
    <v-layout row>
      <v-flex class="center mt-20">
        <tile-button
          @click.native="navigateTo({name: 'reports'})"
          title="Taakoverzicht"
          icon="view_list"
        ></tile-button>
        <tile-button
          @click.native="navigateTo({name: 'availability'})"
          title="Beschikbaarheid"
          icon="event_available"
        ></tile-button>
        <tile-button
          @click.native="navigateTo({name: 'vacancies'})"
          title="Openstaande"
          newLine="vacatures"
          icon="assignment"
        ></tile-button>
        <tile-button
          @click.native="navigateTo({name: 'roster'})"
          title="Mijn"
          newLine="Profiel"
          icon="face"
        ></tile-button>
        <tile-button
          v-if="roleId == 1"
          @click.native="navigateTo({name: '#'})"
          title="Onderwijs"
          newLine="programma beheren"
          icon="build"
        ></tile-button>
        <tile-button
          v-if="roleId == 1"
          @click.native="navigateTo({name: 'users'})"
          title="Gebruikers"
        ></tile-button>

        <tile-button
          v-if="roleId == 3 ||
                roleId == 4 ||
                roleId == 5"
          @click.native="navigateTo({name: '#'})"
          title="Overzicht inzet"
        ></tile-button>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TileButton from "@/components/TileButton.vue";
import axios from "axios";

import jwt_decode from "jwt-decode";

export default {
  data() {
    /*const ADMINISTRATEUR = 1;
    const DOCENT = 2;
    const ONDERWIJSPROGRAMMA_COORDINATOR = 3;
    const PROJECT_COORDINATOR = 4;
    const MODULE_COORDINATOR = 5;
    const FACILITATOR = 6;
    const ROOSTERAAR = 7;*/

    const roleId = 0;
    return {
      roleId: 3
    };
  },
  components: {
    TileButton
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  },
  mounted() {
    console.log("token jwt: " + localStorage.getItem("token"));
    let token = localStorage.getItem("token");
    console.log(this.roleId);

    let decoded = jwt_decode(token);
    console.log("decoded token: " + decoded.role);

    axios
      .get(`http://localhost:3000/api/users/`, {
        withCredentials: true
      })
      .then(response => {
        if (response.data != null) {
          this.roleId = decoded.role;
          console.log("responsedata null");
          console.log(this.roleId);
          console.log(response.data);
        }
      })
      .catch(e => {
        console.log(e);
        //this.errors.push(e);
      });
  }
};
</script>

<style>
.center {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.mt-20 {
  margin-top: 50px;
}

.background {
  background-color: darkblue;
}
</style>
