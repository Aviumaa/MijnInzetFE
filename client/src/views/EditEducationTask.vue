<template>
  <div>
    <v-data-table :headers="headers" :items="this.courses" class="elevation-1">
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
import Tabs from "@/components/Tabs.vue";
export default {
  data() {
    return {
      educationalProgram: "",
      headers: [
        {
          text: "Naam",
          align: "left",
          value: "title"
        },
        { text: "ECTS", value: "ects" },
        { text: "Period", value: "period" },
        { text: "Type", value: "type" }
      ],
      courses: []
    };
  },
  mounted() {
    this.educationalProgram = this.$route.params.educationalProgram;
    axios
      .get(
        `http://localhost:3000/api/educationalProgramCourse/${
          this.educationalProgram.id
        }`
      )
      .then(response => {
        this.courses = response.data[0].courses;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style lang="scss" scoped>
</style>