<template>
  <v-container v-resize="onResize" column class="tasklist-container">
    <v-layout row>
      <v-flex>
        <div class="upperRow">
          <HeaderTitle title="Taakoverzicht"></HeaderTitle>
          <v-data-table
            :headers="headers"
            :items="acceptedVacancies"
            :hide-headers="isMobile"
            :class="{mobile: isMobile}"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <tr class="vacancyAccepted" v-if="!isMobile">
                <td>{{ props.item.vacancy.title }}</td>
                <td>{{ props.item.vacancy.contactPerson }}</td>
                <td>{{ createPeriodField(props.item.vacancy.periods) }}</td>
                <td>{{ props.item.vacancy.typeTask }}</td>
                <td>{{ props.item.vacancy.contactHours }}</td>
              </tr>
              <tr v-else>
                <td>
                  <ul class="flex-content">
                    <li
                      class="flex-item"
                      :data-label="headers[0].text"
                    >{{ props.item.vacancy.title }}</li>
                    <li
                      class="flex-item"
                      :data-label="headers[1].text"
                    >{{ props.item.vacancy.contactPerson }}</li>
                    <li
                      class="flex-item"
                      :data-label="headers[1].text"
                    >{{ props.item.vacancy.period }}</li>
                    <li
                      class="flex-item"
                      :data-label="headers[1].text"
                    >{{ props.item.vacancy.typeTask }}</li>
                    <li
                      class="flex-item"
                      :data-label="headers[1].text"
                    >{{ props.item.vacancy.contactHours }}</li>
                  </ul>
                </td>
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
      isMobile: false,
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
  },
  methods: {
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
    }
  }
};
</script>

<style>
@media (max-width: 600px) {
  .tasklist-container {
    padding: 0;
    margin-top: 1em;
  }
}
</style>