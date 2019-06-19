<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card min-height="80vh" color="white" class="grey--text">
          <v-card-title primary-title>
            <div>
              <div class="headline">Profiel</div>
              <h3>Vul hier uw mail in om notificaties te ontvangen:</h3>
              <v-text-field v-model="inputEmail" label="email"></v-text-field>
              <v-btn @click="saveEmail">Opslaan</v-btn>
            </div>
          </v-card-title>
          <div class="headline pa-3">Mijn Vacatures</div>
          <v-data-table :headers="headers" :items="myVacancies" class="elevation-1">
            <template v-slot:items="props">
              <tr
                :class="[props.item.userVacancies.status == 1 ? 'vacancyAccepted' : 
                ( props.item.userVacancies.status == 2 ? 'vacancyRejected' : 'vacancyPending')]"
              >
                <td>{{ props.item.title }}</td>
                <td class="text-xs-left">{{ props.item.contactPerson }}</td>
                <td class="text-xs-left">{{ props.item.period }}</td>
                <td class="text-xs-left">{{ props.item.typeTask }}</td>
                <td class="text-xs-left">{{ props.item.contactHours }}</td>
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
      status: null,
      headers: [
        {
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
      myVacancies: []
    };
  },
  mounted() {
    this.fetchMyVacancies();
  },
  methods: {
    saveEmail() {
      axios
        .put(
          `http://localhost:3000/api/users/${this.token.id}/email`,
          { withCredentials: true },
          {
            email: this.inputEmail
          }
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    fetchMyVacancies: function() {
      axios
        .get(`http://localhost:3000/api/uservacancies/user/${this.token.id}`, {
          withCredentials: true
        })
        .then(response => {
          for (let i = 0; i < response.data.vacancies.length; i++) {
            this.myVacancies.push(response.data.vacancies[i]);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
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