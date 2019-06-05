<template>
  <v-app>
    <v-tabs fixed-tabs dark>
      <v-tab to="/educationTasks">Onderwijstaken</v-tab>
      <v-tab to="/nonEducationTasks">Niet onderwijstaken</v-tab>
    </v-tabs>
    <v-data-table
    :headers="headers"
    :items="desserts"
    class="elevation-1"
  >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on">
            {{ props.header.text }}
          </span>
        </template>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-left">{{ props.item.coordinator }}</td>
      <td class="text-xs-left">{{ props.item.study }}</td>
      <td class="text-xs-left">{{ props.item.year }}</td>
    </template>
  </v-data-table>
    <router-view></router-view>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data () {
      return {
        headers: [
          {
            text: 'Naam',
            align: 'left',
            value: 'name'
          },
          { text: 'Coordinator',  align: 'left', value: 'coordinator' },
          { text: 'Studierichting',  align: 'left', value: 'study' },
          { text: 'Studiejaar',  align: 'left', value: 'year' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
          }
        ]
      }
    },
    mounted() {
    axios
      .get("http://localhost:3000/api/educationalProgram/")
      .then(response => {
        this.vacancies = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  props: ["title"]
};
</script>

<style>
.color-text-tabs {
  color: primary !important;
  font-weight: 700;
}
</style>