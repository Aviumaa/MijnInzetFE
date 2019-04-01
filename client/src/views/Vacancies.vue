<template>
  <v-container>
    <v-layout>
      <v-flex>
        <HeaderTitle title="Vacatures" subTitle="* uur beschkbaar"></HeaderTitle>
        <v-data-table
          :headers="headers"
          :items="vacancies"
          :search="search"
          :item-key="description"
          hide-actions
          :pagination.sync="pagination"
          class="elevation-3"
        >
          <template v-slot:items="props">
            <td class="py-2">{{ props.item.name }}</td>
            <td class="py-2">{{ props.item.description }}</td>
            <td class="py-2">{{ props.item.moduleCoordinator }}</td>
            <td class="py-2">{{ props.item.Period }}</td>
            <td class="py-2">{{ props.item.typeCourse }}</td>
            <td class="py-2">{{ props.item.contactHours }}</td>
          </template>
        </v-data-table>
        <div class="text-xs-right pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>
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
      pagination: {
        search: "",
        page: 3,
        rowsPerPage: 20
      },
      selected: [],
      search: "",
      description: "",
      headers: [
        {
          text: "Vak",
          sortable: false,
          value: "name"
        },
        {
          text: "Beschrijving",
          sortable: false,
          value: "description"
        },
        {
          text: "Module coordinator",
          sortable: false,
          value: "moduleCoordinator"
        },
        {
          text: "Periode",
          sortable: false,
          value: "Period"
        },
        {
          text: "Type",
          sortable: false,
          value: "typeCourse"
        },
        {
          text: "Contacttijd",
          sortable: false,
          value: "contactHours"
        }
      ],
      vacancies: []
    };
  },
  components: {
    HeaderTitle
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/vacancies/")
      .then(response => {
        this.vacancies = response.data;
        this.pagination.totalItems = this.vacancies.length;
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    pages() {
      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  }
};
</script>

<style scoped>
.table-content {
  overflow: auto;
  height: 100vh;
}
</style>