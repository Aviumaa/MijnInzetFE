<template>
  <v-container class="profile-container">
    <v-layout>
      <v-flex xs12 v-resize="onResize" column>
        <v-card height="80vh" color="white" class="grey--text">
          <v-card-title primary-title>
            <div>
              <div class="headline">Profiel</div>
              <h3>Vul hier uw mail in om notificaties te ontvangen:</h3>
              <v-text-field v-model="inputEmail" label="email"></v-text-field>
              <v-btn @click="saveEmail">Opslaan</v-btn>
            </div>
          </v-card-title>
          <div class="headline pa-3">Mijn Vacatures</div>
          <v-data-table
            :headers="headers"
            :items="myVacancies"
            class="elevation-1"
            :hide-headers="isMobile"
            :class="{mobile: isMobile}"
          >
            <template v-slot:items="props">
              <tr v-if="!isMobile">
                <td>{{ props.item.title }}</td>
                <td class="text-xs-left">{{ props.item.description }}</td>
                <td class="text-xs-left">{{ props.item.contactPerson }}</td>
                <td class="text-xs-left">{{ props.item.period }}</td>
                <td class="text-xs-left">{{ props.item.typeTask }}</td>
                <td class="text-xs-left">{{ props.item.contactHours }}</td>
              </tr>
              <tr v-else>
                <td>
                  <ul class="flex-content">
                    <li class="flex-item" :data-label="headers[0].text">{{ props.item.description }}</li>
                    <li
                      class="flex-item"
                      :data-label="headers[1].text"
                    >{{ props.item.contactPerson }}</li>
                    <li class="flex-item" :data-label="headers[2].text">{{ props.item.period }}</li>
                    <li class="flex-item" :data-label="headers[3].text">{{ props.item.typeTask }}</li>
                    <li
                      class="flex-item"
                      :data-label="headers[4].text"
                    >{{ props.item.contactHours }}</li>
                  </ul>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  props: ["token"],
  data() {
    return {
      inputEmail: "",
      headers: [
        {
          text: "Titel",
          sortable: true,
          value: "task",
          width: "15%",
          class: "px-3"
        },
        {
          text: "Taak",
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
      myVacancies: [],
      isMobile: false
    };
  },
  mounted() {
    this.fetchMyVacancies();
  },
  methods: {
    saveEmail() {
      axios
        .put(`http://localhost:3000/api/users/${this.token.id}/email`, {
          email: this.inputEmail
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    fetchMyVacancies: function() {
      axios
        .get(`http://localhost:3000/api/uservacancies/user/${this.token.id}`)
        .then(response => {
          for (let i = 0; i < response.data.vacancies.length; i++) {
            this.myVacancies.push(response.data.vacancies[i]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    }
  }
};
</script>

<style>
.profile-container {
  padding: unset;
}

.contentCard {
  height: 500px;
  width: 500px;
  align-items: center;
}
</style>