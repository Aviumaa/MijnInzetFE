<template>
  <v-container>
    <v-layout row>
      <v-flex>
        <div class="upperRow">
          <HeaderTitle title="Taakoverzicht"></HeaderTitle>
          <v-data-table :headers="headers" :items="acceptedVacancies" class="elevation-1">
            <template v-slot:items="props">
              <tr class="vacancyAccepted">
                <td>{{ props.item.vacancy.title }}</td>
                <td>{{ props.item.vacancy.contactPerson }}</td>
                <td>{{ props.item.vacancy.period }}</td>
                <td>{{ props.item.vacancy.typeTask }}</td>
                <td>{{ props.item.vacancy.contactHours }}</td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import HeaderTitle from "@/components/HeaderTitle.vue";

export default {
  data() {
    return {
      acceptedVacancies: [],
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
      ]
    };
  },
  props: ["token"],
  components: { HeaderTitle },
  mounted() {
    axios
      .get(`http://localhost:3000/api/userVacancies/user/${this.token.id}/1`, {
        withCredentials: true
      })
      .then(response => {
        for (let i = 0; i < response.data.length; i++) {
          this.acceptedVacancies.push(response.data[i]);
        }
      });
  }
};
</script>