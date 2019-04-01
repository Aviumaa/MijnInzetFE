<template>
  <v-container>
    <v-layout>
      <v-flex>
        <HeaderTitle title="Vacatures" subTitle="* uur beschkbaar"></HeaderTitle>
        <vacancies-dashboard title="Vacatures"></vacancies-dashboard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HeaderTitle from "@/components/HeaderTitle.vue";
import VacanciesDashboard from "@/components/VacanciesDashboard.vue";
export default {
  data() {
    return {};
  },
  components: {
    HeaderTitle,
    VacanciesDashboard
  }
};
</script>

<style scoped>
</style>