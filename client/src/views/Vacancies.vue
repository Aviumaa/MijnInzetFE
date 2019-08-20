<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div class="upperRow">
          <HeaderTitle title="Vacatures"></HeaderTitle>
          <!-- <v-btn
            v-if="authToken.role == '1'"
            @click="navigateTo({name: 'createvacancy'})"
            fab
            dark
            color="indigo darken-4"
            class="fab-button"
          >
            <v-icon dark>add</v-icon>
          </v-btn>-->
        </div>
        <v-btn @click="callApi">Ping</v-btn>
        <div v-if="apiMessage">
          <h2>Result</h2>
          <p>{{ apiMessage }}</p>
        </div>
        <VacanciesDashboard :headers="headers" :content="vacancies" :authToken="authToken"></VacanciesDashboard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HeaderTitle from "@/components/HeaderTitle.vue";
import VacanciesDashboard from "@/components/VacanciesDashboard.vue";
// import axios from "axios";

export default {
  data() {
    return {
      headers: [
        {
          text: "Titel",
          sortable: true,
          value: "title",
          class: "px-3"
        },
        {
          text: "Contactpersoon",
          sortable: true,
          value: "contactPerson",
          class: "px-3"
        },
        {
          text: "Periode",
          sortable: true,
          value: "Period",
          class: "px-3"
        },
        {
          text: "Type",
          sortable: true,
          value: "typeCourse",
          class: "px-3"
        },
        {
          text: "Taak",
          sortable: true,
          value: "typeTask",
          class: "px-3"
        },
        {
          text: "Inzet (uren)",
          sortable: true,
          value: "contactHours",
          class: "px-3"
        }
      ],
      content: [],
      vacancies: [],
      authToken: this.token,
      apiMessage: null
    };
  },
  props: ["token"],
  components: {
    HeaderTitle,
    VacanciesDashboard
  },
  // mounted() {
  //   axios
  //     .get("http://localhost:3000/api/vacancies/", {
  //       // withCredentials: true
  //     })
  //     .then(response => {
  //       this.vacancies = response.data;
  //     });
  // },
  methods: {
    // navigateTo(route) {
    //   this.$router.push(route);
    // },
    async callApi() {
      const accessToken = await this.$auth.getAccessToken();

      console.log(this.$auth.getAccessToken());

      try {
        const { data } = await this.$axios.get("/api/vacancies/", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log(data);

        this.apiMessage = data;
      } catch (e) {
        this.apiMessage = `Error: the server responded with '${e.response.status}: ${e.response.statusText}'`;
      }
    }
  }
};
</script>

<style scoped>
.upperRow {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.fab-button {
  height: 46px;
  width: 46px;
}
</style>
