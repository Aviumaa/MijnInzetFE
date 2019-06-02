<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div class="upperRow">
          <HeaderTitle title="Vacatures" subTitle="* uur beschikbaar"></HeaderTitle>
          <v-btn @click="navigateTo({name: 'createvacancy'})" fab dark color="indigo darken-4">
            <v-icon dark>add</v-icon>
          </v-btn>
        </div>
        <VacanciesDashboard :headers="headers" :content="vacancies" :authToken="authToken"></VacanciesDashboard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HeaderTitle from "@/components/HeaderTitle.vue";
import VacanciesDashboard from "@/components/VacanciesDashboard.vue";
import axios from "axios";

export default {
  data() {
    return {
      headers: [
        {
          text: "Taak",
          sortable: true,
          value: "task",
          width: "15%",
          class: "px-3"
        },
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
          width: "10%",
          class: "px-3"
        },
        {
          text: "Periode",
          sortable: true,
          value: "Period",
          width: "20%",
          class: "px-3"
        },
        {
          text: "Type",
          sortable: true,
          value: "typeCourse",
          width: "2%",
          class: "px-3"
        },
        {
          text: "Inzet (uren)",
          sortable: true,
          value: "contactHours",
          width: "2%",
          class: "px-3"
        }
      ],
      content: [],
      vacancies: [],
      authToken: this.token
    };
  },
  props: ["token"],
  components: {
    HeaderTitle,
    VacanciesDashboard
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/vacancies/")
      .then(response => {
        this.vacancies = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
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
</style>
