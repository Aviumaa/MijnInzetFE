<template>
  <div>
    <v-data-table
      :headers="this.headers"
      :items="this.content"
      :item-key="this.content.id"
      :search="search"
      :pagination.sync="pagination"
      :disable-initial-sort="true"
      hide-actions
      class="elevation-3"
    >
      <template v-slot:items="props">
        <tr @click="showModal(props.item)">
          <td class="px-3">{{ props.item.title }}</td>
          <td class="px-3">{{ props.item.contactPerson }}</td>
          <td class="px-3">{{ props.item.period }} | {{props.item.schoolYear}}</td>
          <td class="px-3">{{ props.item.typeCourse }}</td>
          <td class="px-3">{{ props.item.typeTask }}</td>
          <td class="px-3">{{ props.item.contactHours }}</td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-xs-right pt-2">
      <v-pagination v-model="pagination.page" :length="pages" :total-visible="7" color="black"></v-pagination>
    </div>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <div class="topRow">
          <v-flex>
            <HeaderTitle title="Vacature" :subTitle="this.selected.name"></HeaderTitle>
          </v-flex>
        </div>
        <v-card-text>
          <div class="informationRow">
            <div class="information">
              <strong>Contactpersoon:</strong>
              {{this.selected.contactPerson}}
            </div>
            <div class="information" max-width="50px">
              <strong>Beschrijving:</strong>
              {{this.selected.description}}
            </div>
            <div class="information">
              <strong>Openstaande uren:</strong>
              {{this.selected.contactHours}}
            </div>
            <div class="information">
              <strong>Soort vacature:</strong>
              {{this.selected.typeCourse}}
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            round
            color="indigo darken-4"
            class="applyToVacancyButton"
            @click="applyToVacancy()"
          >Solliciteer</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <loading-dialog ref="loadingDialog"/>
    <response-dialog ref="responseDialog"/>
  </div>
</template>


<script>
import HeaderTitle from "@/components/HeaderTitle.vue";
import axios from "axios";
import LoadingDialog from "@/components/LoadingDialog.vue";
import ResponseDialog from "./ResponseDialog";

export default {
  data() {
    return {
      pagination: {
        search: "",
        page: 1,
        rowsPerPage: 10
      },
      selected: [],
      search: "",
      dialog: false
    };
  },
  props: ["headers", "content", "authToken"],
  computed: {
    pages() {
      // eslint-disable-next-line
      this.pagination.totalItems = this.content.length;

      if (
        this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      )
        return 0;

      return Math.ceil(
        this.pagination.totalItems / this.pagination.rowsPerPage
      );
    }
  },
  methods: {
    showModal(item) {
      this.selected = item;
      this.dialog = true;
    },
    applyToVacancy() {
      this.dialog = false;
      this.$refs.loadingDialog.open("Verzoek indienen");
      axios
        .post(
          "http://localhost:3000/api/UserVacancies",
          {
            vacancyId: this.selected.id,
            userId: this.authToken.id
          },
          {
            withCredentials: true
          }
        )
        .then(response => {
          if (response.status === 201) {
            this.openResponseDialog(response.status);
          }
        });
    },
    openResponseDialog(responseStatus) {
      this.$refs.loadingDialog.close();
      if (responseStatus === 201) {
        this.$refs.responseDialog.open("Verzoek is ingediend", "done");
      } else {
        this.$refs.responseDialog.open(
          "Verzoek kon niet worden ingediend",
          "clear"
        );
      }
    }
  },
  components: {
    ResponseDialog,
    HeaderTitle,
    LoadingDialog
  }
};
</script>

<style scoped>
.description.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 10vw;
  height: 4.5em;
}

.applyToVacancyButton {
  color: white;
  margin-bottom: 10px;
}
</style>
