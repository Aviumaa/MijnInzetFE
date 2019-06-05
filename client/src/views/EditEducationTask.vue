<template>
    <div>
 <v-data-table
    :headers="headers"
    :items="course"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.title }}</td>
      <td class="text-xs-left">{{ props.item.ects }}</td>
      <td class="text-xs-left">{{ props.item.period }}</td>
      <td class="text-xs-left">{{ props.item.type }}</td>
    </template>
  </v-data-table>
    </div>
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
            value: 'title'
          },
          { text: 'ECTS', value: 'ects' },
          { text: 'Period', value: 'period' },
          { text: 'Type', value: 'type' },
        ],
        course: []
      }
    },
      mounted() {
    axios
      .get("http://localhost:3000/api/course/")
      .then(response => {
        this.course = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
    }
</script>

<style lang="scss" scoped>

</style>