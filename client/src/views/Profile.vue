<template>
  <v-container class="profile-container">
    <v-layout>
      <v-flex xs12 v-resize="onResize" column>
        <v-card min-height="80vh" color="white" class="grey--text">
          <v-card-title primary-title>
            <div>
              <h1 class="headline pb-3">Profiel</h1>
              <p class=".body-1">Aanhef: {{ salutation }}</p>
              <p class=".body-1">Gebruikersnaam: {{ userName }}</p>
              <p class=".body-1">Volledige naam: {{ fullName }}</p>

              <p class=".body-1">Vul hier uw mail in om notificaties te ontvangen:</p>
              <v-text-field v-model="email" label="email"></v-text-field>
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
                :class="[props.item.status == 1 ? 'vacancyAccepted' : 
                ( props.item.status == 2 ? 'vacancyRejected' : 'vacancyPending')]"
              >
                <td>{{ props.item.vacancy.title }}</td>
                <td>{{ props.item.vacancy.contactPerson }}</td>
                <td>{{ createPeriodField(props.item.vacancy.periods) }}</td>
                <td>{{ props.item.vacancy.typeTask }}</td>
                <td>{{ props.item.vacancy.contactHours }}</td>
                <td>{{ props.item.vacancy.createdAt }}</td>
              </tr>
              <tr
                v-else
                :class="[props.item.status == 1 ? 'vacancyAccepted' : 
                ( props.item.status == 2 ? 'vacancyRejected' : 'vacancyPending')]"
              >
                <td>
                  <ul class="flex-content">
                    <li
                      class="flex-item"
                      :data-label="headers[1].text"
                    >{{ props.item.vacancy.contactPerson }}</li>
                    <li
                      class="flex-item"
                      :data-label="headers[2].text"
                    >{{ props.item.vacancy.period }}</li>
                    <li
                      class="flex-item"
                      :data-label="headers[4].text"
                    >{{ props.item.vacancy.contactHours }}</li>
                    <li
                      class="flex-item"
                      :data-label="headers[3].text"
                    >{{ props.item.vacancy.createdAt }}</li>
                  </ul>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
    <loading-dialog ref="loadingDialog" />
    <response-dialog ref="responseDialog" />
  </v-container>
</template>

<script>
import LoadingDialog from "@/components/LoadingDialog.vue";
import ResponseDialog from "@/components/ResponseDialog.vue";

export default {
  components: {
    LoadingDialog,
    ResponseDialog
  },
  data() {
    return {
      profile: this.$auth.profile,
      salutation: this.$auth.porfile,
      userName: this.$auth.profile.nickname,
      fullName: "",
      email: this.$auth.profile.email,
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
        },
        {
          text: "Aangemeld op",
          sortable: true,
          value: "createdAt"
        }
      ],
      myVacancies: [],
      isMobile: false
    };
  },
  mounted() {
    this.fetchMyVacancies();
    this.getUserMetadata();
  },
  methods: {
    handleLoginEvent(data) {
      this.profile = data.profile;
      // console.log(this.$auth.isAuthenticated);
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async fetchMyVacancies() {
      const accessToken = await this.$auth.getAccessToken();

      try {
        const { data } = await this.$axios.get(`/api/userVacancies/user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        for (let i = 0; i < data.length; i++) {
          this.myVacancies.push(data[i]);
        }

        this.myVacancies.reverse();
      } catch (e) {
        console.log(
          `Error: the server responded with '${e.response.status}: ${e.response.statusText}'`
        );
      }
    },
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
    },
    createPeriodField(periods) {
      if (periods === null) {
        return "";
      } else {
        var periodField = "";
        for (var i = 0; i < periods.length; i++) {
          periodField =
            periodField +
            periods[i].schoolYear +
            " | " +
            periods[i].quarter +
            ", ";
        }
        return periodField.trim().substring(0, periodField.length - 2);
      }
    },
    getUserMetadata() {
      const user = Object.values(this.$auth.profile)[0];
      this.salutation = user.salutation;
      this.fullName = user.full_name;
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

@media (max-width: 600px) {
  .vacancyAccepted {
    border-left: 0.5em solid #66bb6a;
  }

  .vacancyRejected {
    border-left: 0.5em solid #e53935;
  }

  .vacancyPending {
    border-left: 0.5em solid #ffd600;
  }
}
</style>