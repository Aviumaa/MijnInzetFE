<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="primary" dark class="mb-2">New Item</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{formTitle}}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.title" label="Naam"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field type="number" v-model="editedItem.ects" label="ECTS"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.period" label="Periode"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.type" label="Type"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Sluiten</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Opslaan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-data-table
      :headers="headers"
      :items="this.courses"
      :rows-per-page-items="rowsPerPageItems"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-left">{{ props.item.ects }}</td>
        <td class="text-xs-left">{{ props.item.period }}</td>
        <td class="text-xs-left">{{ props.item.type }}</td>
        <td class="text-xs-center">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item.id)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <!-- SelectFile -->
    <div style="border: 1px solid black">
      <div class="btn">
        <span>Kies een bestand met vakken om in te lezen...</span>
        <br>
        <input id="fileSelector" name="myFile" type="file" multiple="multiple">
      </div>
      <div>
        <input type="text">
      </div>
      <div>
        <p id="fileContents"></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Tabs from "@/components/Tabs.vue";
import SelectFile from "@/components/SelectFile.vue";
const Papa = require("papaparse");

export default {
  data() {
    return {
      counter: 0,
      dialog: false,
      educationalProgramCourse: 1,
      rowsPerPageItems: [20, 30, 40, 50],
      headers: [
        {
          text: "Naam",
          align: "left",
          value: "name"
        },
        { text: "ECTS", value: "ects" },
        { text: "Periode", value: "period" },
        { text: "Type", value: "type" },
        { text: "Acties", value: "type", align: "center" }
      ],
      courses: [],
      editedIndex: -1,
      editedItem: {
        title: "",
        ects: "",
        period: "",
        type: ""
      },
      defaultItem: {
        title: "",
        ects: "",
        peroid: "",
        type: ""
      },
      listPrimitive: null
    };
  },

  mounted() {
    console.log(this.$route.params)
    axios
      .get(
        `http://localhost:3000/api/course/program/${
          this.$route.params.id
          
        }`,
        {
          withCredentials: true
        }
      )
      .then(response => {
         if (response.status == 200) {
           this.courses = response.data[0].courses;
           console.log(this.courses);
        }
        else {
          console.log("else")
        }
      });
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nieuw" : "Bewerken";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.courses.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Weet je zeker dat je dit vak wilt verwijderen?") &&
        axios
          .delete(`http://localhost:3000/api/course/${item}`, 
            { 
            withCredentials: true,
            method: 'DELETE'
            }
          )
          .then(response => {

          })
          .catch(error => {
            console.log(error);
          });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        axios
          .put(
            `http://localhost:3000/api/course/${this.editedItem.id}`,
            {
              title: this.editedItem.title,
              ects: this.editedItem.ects,
              period: this.editedItem.period,
              type: this.editedItem.type
            },
            { withCredentials: true }
          )
          .then(response => {
            if (response.status == 200) {
              console.log(this.editedItem);
              this.courses[response.data - 1] = this.editedItem;
              this.$router.go("editEducation");
            }
          })
          .catch(error => {
            if (error.response.status == 400) {
              console.log("bad request");
            }
          });
      } else {
        let eduCourseID = this.educationalProgramCourse;
        axios
          .post(
            `http://localhost:3000/api/course/`,
            {
              educationalProgramId: eduCourseID,
              title: this.editedItem.title,
              ects: this.editedItem.ects,
              period: this.editedItem.period,
              type: this.editedItem.type
            },
            { withCredentials: true }
          )
          .then(response => {
            if (response.status == 200) {
              this.courses[response.data - 1] = this.editedItem;
              this.$router.go("editEducation");
            }
          })
          .catch(error => {
            if (error.response.status == 400) {
              console.log("bad request");
            }
          });
      }

      this.close();
    }
  }
};
</script>

<style>
.file-container {
  border: 1px solid black;
  padding: 1em;
}
</style>
