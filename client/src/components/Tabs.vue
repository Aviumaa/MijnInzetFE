<template>
  <v-app>
    <v-tabs fixed-tabs dark>
      <v-tab to="/educationTasks">Onderwijstaken</v-tab>
      <v-tab to="/nonEducationTasks">Niet onderwijstaken</v-tab>
    </v-tabs>
    <v-data-table
    :headers="headers"
    :items="educationalPrograms"
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
      <td class="text-xs-left">{{ props.item.title }}</td>
      <td class="text-xs-left">todo</td>
      <td class="text-xs-left">{{ props.item.study }}</td>
      <td class="text-xs-left">{{ props.item.year }}</td>
      <v-btn  small color="primary" @click="navigateTo('editEducation')" ><v-icon>edit</v-icon></v-btn>

    </template>
  </v-data-table>
          <v-btn  fab dark color="primary">
      <v-icon dark>add</v-icon>
    </v-btn>
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
          { text: 'Bewerken',  align: 'left', value: 'year', sortable: false },
        ],
        educationalPrograms: []
      }
    },
      methods: {
    navigateTo(route, course) {
      this.$router.push({ name: route, params: { course: course } });
    }
     },
    mounted() {
    axios
      .get("http://localhost:3000/api/educationalProgram/")
      .then(response => {
        this.educationalPrograms = response.data;
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