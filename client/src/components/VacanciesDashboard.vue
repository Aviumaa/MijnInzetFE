<template>
  <div v-resize="onResize" column class="vacancy-container">
    <v-card>
      <v-card-title>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>

      <v-data-table
        :headers="this.headers"
        :items="this.content"
        :item-key="this.content.id"
        :search="search"
        :pagination.sync="pagination"
        :disable-initial-sort="true"
        hide-actions
        :hide-headers="isMobile"
        :class="{mobile: isMobile}"
        :custom-filter="customFilter"
      >
        <template v-slot:items="props">
          <tr @click="showModal(props.item)" v-if="!isMobile">
            <td class="px-3">{{ props.item.title }}</td>
            <td class="px-3">{{ props.item.contactPerson }}</td>
            <td class="px-3">{{ props.item.period }} | {{props.item.schoolYear}}</td>
            <td class="px-3">{{ props.item.typeCourse }}</td>
            <td class="px-3">{{ props.item.typeTask }}</td>
            <td class="px-3">{{ props.item.contactHours }}</td>
          </tr>
          <tr v-else>
            <td>
              <ul class="flex-content" @click="showModal(props.item)">
                <li class="flex-item" :data-label="headers[0].text">{{ props.item.title }}</li>
                <li class="flex-item" :data-label="headers[1].text">{{ props.item.contactPerson }}</li>
                <li class="flex-item" :data-label="headers[2].text">{{ props.item.period }}</li>
                <li class="flex-item" :data-label="headers[3].text">{{ props.item.typeCourse }}</li>
                <li class="flex-item" :data-label="headers[4].text">{{ props.item.typeTask }}</li>
                <li class="flex-item" :data-label="headers[5].text">{{ props.item.contactHours }}</li>
              </ul>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <div class="text-xs-right pt-2">
      <v-pagination
        class="vacancy-pagination"
        v-model="pagination.page"
        :length="pages"
        :total-visible="isMobile ? 5 : 7"
        color="black"
      ></v-pagination>
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
      dialog: false,
      isMobile: false,
      list: []
    };
  },
  props: ["headers", "content", "authToken"],
  computed: {
    pages() {
      if (this.list.length == 0) {
        // eslint-disable-next-line
        this.pagination.totalItems = this.content.length;
      } else {
        // eslint-disable-next-line
        this.pagination.totalItems = this.list.length;
      }

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
            userId: this.authToken.id,
            status: 0
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
    },
    customFilter(items, search, filter) {
      if (!search) {
        this.list = [];
        return items;
      }

      function new_filter(val, search) {
        return (
          val !== null &&
          ["undefined", "boolean"].indexOf(typeof val) === -1 &&
          val
            .toString()
            .toLowerCase()
            .replace(/[^0-9a-zA-Z]+/g, "")
            .indexOf(search) !== -1
        );
      }

      let needleAry = search
        .toString()
        .toLowerCase()
        .split(" ")
        .filter(x => x);

      return (this.list = items.filter(row =>
        needleAry.every(needle =>
          Object.keys(row).some(key => new_filter(row[key], needle))
        )
      ));
    },
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    }
  },
  components: {
    ResponseDialog,
    HeaderTitle,
    LoadingDialog
  }
};
</script>

<style >
.vacancy-container {
  /* display: flex; */
  /* flex-direction: column; */
  /* align-items: flex-end; */
}

.vacancy-pagination {
  margin: 1em 0;
}

.description.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 10vw;
  height: 4.5em;
}

.applyToVacancyButton .v-btn__content {
  color: white;
}
</style>
