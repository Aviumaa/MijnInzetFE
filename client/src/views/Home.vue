<template>
  <v-container>
    <v-layout row>
      <v-flex class="center mt-20">
        <tile-button
          @click.native="navigateTo({name: 'reports'})"
          class="teal lighten-1"
          title="Taakoverzicht"
        ></tile-button>
        <tile-button
          @click.native="navigateTo({name: 'reports'})"
          class="teal lighten-1"
          title="Beschikbaarheid"
        ></tile-button>
        <tile-button
          @click.native="navigateTo({name: 'vacancies'})"
          class="teal lighten-1"
          title="Openstaande"
          newLine="vacatures"
        ></tile-button>
        <tile-button
          @click.native="navigateTo({name: 'roster'})"
          class="teal lighten-1"
          title="Mijn Profiel"
        ></tile-button>

        <tile-button v-if="roleId == 3"
          @click.native="navigateTo({name: '#'})"
          class="teal lighten-1"
          title="Onderwijsprogramma"
          newLine="beheren"
        ></tile-button>

        <tile-button v-if="roleId == 3 ||
                           roleId == 4 ||
                           roleId == 5"
          @click.native="navigateTo({name: '#'})"
          class="teal lighten-1"
          title="Overzicht inzet"
        ></tile-button>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TileButton from "@/components/TileButton.vue";
import axios from "axios";

export default {
  data() {
    /*const ADMINISTRATEUR = 1;
    const DOCENT = 2;
    const ONDERWIJSPROGRAMMA_COORDINATOR = 3;
    const PROJECT_COORDINATOR = 4;
    const MODULE_COORDINATOR = 5;
    const FACILITATOR = 6;
    const ROOSTERAAR = 7;*/
    return {
      vacancyText: 'Hello Vue.\nThis ext.\nAnother line of text.\n',
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
  mounted(){
    axios
        .get(`http://localhost:3000/api/users/`, {
          withCredentials: true
          })
        .then(response => {
          if (response.data != null){
            this.roleId = response.data.roleId;
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

<style scoped>
.tile-buttons {
  width: 220px;
  height: 220px;
}

.center {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.mt-20 {
  margin-top: 50px;
}
</style>
