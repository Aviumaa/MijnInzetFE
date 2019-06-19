<template>
  <v-container class="profile-container">
    <v-layout>
      <v-flex xs12 v-resize="onResize" column>
        <v-card min-height="80vh" color="white" class="grey--text">
          <v-card-title primary-title>
            <div>
              <div class="headline">Profiel</div>
              <p class=".body-1">Gebruikersnaam: {{ userName }}</p>

              <p class=".body-1">Vul hier uw mail in om notificaties te ontvangen:</p>
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
              <tr
                v-if="!isMobile"
                :class="[props.item.userVacancies.status == 1 ? 'vacancyAccepted' : 
                ( props.item.userVacancies.status == 2 ? 'vacancyRejected' : 'vacancyPending')]"
              >
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.contactPerson }}</td>
                <td>{{ props.item.period }}</td>
                <td>{{ props.item.typeTask }}</td>
                <td>{{ props.item.contactHours }}</td>
              </tr>
              <tr
                v-else
                :class="[props.item.userVacancies.status == 1 ? 'vacancyAccepted' : 
                ( props.item.userVacancies.status == 2 ? 'vacancyRejected' : 'vacancyPending')]"
              >
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
    <loading-dialog ref="loadingDialog"/>
    <response-dialog ref="responseDialog"/>
  </v-container>
</template>

<script>
import axios from "axios";
import LoadingDialog from "@/components/LoadingDialog.vue";
import ResponseDialog from "@/components/ResponseDialog.vue";

export default {
  props: ["token"],
  components: {
    LoadingDialog,
    ResponseDialog
  },
  data: () => {
    return {
      inputEmail: "mijn@email.nl",
      userName: "gebruikersnaam",
      headers: [
        {
          status: null,
          text: "Titel",
          sortable: true,
          value: "task"
        },
        {
          text: "Contactpersoon",
          sortable: true,
          value: "contactPerson"
        },
        {
          text: "Periode",
          sortable: true,
          value: "Period"
        },
        {
          text: "Type",
          sortable: true,
          value: "typeCourse"
        },
        {
          text: "Inzet (uren)",
          sortable: true,
          value: "contactHours"
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
      this.$refs.loadingDialog.open("Email updaten");
      axios
        .put(`http://localhost:3000/api/users/${this.token.id}/email`, {
          email: this.inputEmail
        })
        .then(response => {
          this.openResponseDialog(response.status);
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchMyVacancies: function() {
      axios
        .get(`http://localhost:3000/api/uservacancies/user/${this.token.id}`, {
          withCredentials: true
        })
        .then(response => {
          this.userName = response.data.username;
          this.inputEmail = response.data.email;
          for (let i = 0; i < response.data.vacancies.length; i++) {
            this.myVacancies.push(response.data.vacancies[i]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    openResponseDialog: function(responseStatus) {
      this.$refs.loadingDialog.close();
      if (responseStatus === 200) {
        this.$refs.responseDialog.open("Email is geüpdatet", "done");
      } else {
        this.$refs.responseDialog.open(
          "email kon niet worden geüpdatet",
          "clear"
        );
      }
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

.vacancyAccepted {
  border-left: 1em solid #66bb6a;
}

.vacancyRejected {
  border-left: 1em solid #e53935;
}

.vacancyPending {
  border-left: 1em solid #ffd600;
}
</style>