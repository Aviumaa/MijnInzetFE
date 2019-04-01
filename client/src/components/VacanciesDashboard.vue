<template>
  <!-- <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark>
        back
      </v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="vacancies"
      :expand="expand"
      item-key="name"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td class="text-xs-left">{{ props.item.course }}</td>
          <td class="text-xs-left">{{ props.item.collaborators }}</td>
          <td class="text-xs-left">{{ props.item.module }}</td>
          <td class="text-xs-left">{{ props.item.hours }}</td>
          <td class="text-xs-left"><v-btn color="success">Aanvragen</v-btn></td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-card flat>
          <v-card-text>{{props.item.name}}</v-card-text>
        </v-card>
      </template>
    </v-data-table>
  </div>-->

  <div>
    <v-data-table :headers="headers" :items="data" item-key="name" hide-actions>
      <template v-slot:items="props">
        <!-- <tr v-for="vacancy in data" :key="vacancy.id"> -->
        <td class="text-xs-left">{{ vacancy.name }}</td>
        <td class="text-xs-left">{{ props.item.collaborators }}</td>
        <td class="text-xs-left">{{ props.item.module }}</td>
        <td class="text-xs-left">{{ props.item.hours }}</td>
        <!-- </tr> -->
      </template>
      <!-- <template v-slot:expand="props">
        <v-card flat>
          <v-card-text>{{props.item.name}}</v-card-text>
        </v-card>
      </template>-->
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expand: false,
      headers: [
        {
          text: "Vak",
          align: "left",
          sortable: true,
          value: "name"
        },
        {
          text: "Module coordinator",
          align: "left",
          sortable: true,
          value: "moduleCoordinator"
        },
        {
          text: "Periode",
          align: "left",
          sortable: true,
          value: "Period"
        },
        {
          text: "Type",
          align: "left",
          sortable: true,
          value: "typeCourse"
        },
        {
          text: "Contacttijd",
          align: "left",
          sortable: true,
          value: "contactHours"
        }
        // {
        //   text: "Actions",
        //   align: "left",
        //   sortable: false,
        //   value: "actions"
        // }
      ]
      // vacancies: [
      //   {
      //     name: "Mathematics that are discrete",
      //     course: "Discrete mathematics",
      //     hours: 6,
      //     module: "Basisfase",
      //     collaborators: "Marcio Fuckner, Karthik Srinivasan"
      //   },
      //   {
      //     name: "The design of research",
      //     course: "Research Design",
      //     hours: 2,
      //     module: "Verdiepingsfase",
      //     collaborators: "Sybe Dijkstra, David Seegers"
      //   },
      //   {
      //     name: "Structure of data",
      //     course: "Datastructures",
      //     hours: 8,
      //     module: "Basisfase",
      //     collaborators: "Nico Tromp, Saskia Robben"
      //   },
      //   {
      //     name: "Orientation of jobs",
      //     course: "Job orientation",
      //     hours: 6,
      //     module: "Verdiepingsfase",
      //     collaborators: "Zarina Efendijeva"
      //   },
      //   {
      //     name: "Architecture on mobile devices, working with APIs, etc.",
      //     course: "Mobile Architecture",
      //     hours: 5,
      //     module: "Themasemester - Mobile Development",
      //     collaborators: "Folkert Boonstra, Ruud Slokker"
      //   },
      //   {
      //     name: "Write papers about the mobile society",
      //     course: "Mobile Society",
      //     hours: 2,
      //     module: "Themasemester - Mobile Development",
      //     collaborators: "Anders Bouwer"
      //   }
      // ]
    };
  },
  props: ["title", "content"]
};
</script>

<style scoped>
</style>