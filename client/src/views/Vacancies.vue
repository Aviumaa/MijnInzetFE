<template>
  <v-container>
    <v-layout>
      <v-flex>
        <div class="upperRow">
          <HeaderTitle title="Vacatures"></HeaderTitle>
          <v-btn
            v-if="userRoles.includes('admin')"
            @click="navigateTo({name: 'createvacancy'})"
            fab
            dark
            color="indigo darken-4"
            class="fab-button"
          >
            <v-icon dark>add</v-icon>
          </v-btn>
        </div>
        <VacanciesDashboard :headers="headers" :content="vacancies"></VacanciesDashboard>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HeaderTitle from "@/components/HeaderTitle.vue";
import VacanciesDashboard from "@/components/VacanciesDashboard.vue";

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
      userRoles: []
    };
  },
  components: {
    HeaderTitle,
    VacanciesDashboard
  },
  mounted() {
    this.getUserRole();
    this.getVacancies();
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    getUserRole() {
      const user = Object.values(this.$auth.profile)[1];
      this.userRoles = user.roles;
    },
    async getVacancies() {
      const accessToken = await this.$auth.getAccessToken();

      try {
        const { data } = await this.$axios.get("/api/vacancies/", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        this.vacancies = data;
      } catch (e) {
        console.log(
          `Error: the server responded with '${e.response.status}: ${e.response.statusText}'`
        );
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
