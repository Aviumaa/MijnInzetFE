<template>
  <v-container>
    <v-layout>
      <v-flex>
        <HeaderTitle title="Vacatures" subTitle="* uur beschikbaar"></HeaderTitle>
        <VacanciesDashboard :headers="headers" :content="vacancies"></VacanciesDashboard>
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
          text: "Vak",
          sortable: true,
          value: "name",
          width: "15%",
          class: "px-3"
        },
        {
          text: "Beschrijving",
          sortable: true,
          value: "description",
          class: "px-3"
        },
        {
          text: "Module coordinator",
          sortable: true,
          value: "moduleCoordinator",
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
          text: "Contacttijd",
          sortable: true,
          value: "contactHours",
          width: "2%",
          class: "px-3"
        }
      ],
      content: [],
      vacancies: []
    };
  },
  components: {
    HeaderTitle,
    VacanciesDashboard
  },
  mounted() {
    axios
      .get("http://oege.ie.hva.nl/~goosb001:3000/api/vacancies/")
      .then(response => {
        this.vacancies = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
</style>
