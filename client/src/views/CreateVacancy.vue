<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <br>
      <v-flex>
        <HeaderTitle title="Vacature aanmaken"></HeaderTitle>
      </v-flex>
      <v-form ref="form">
        <v-card>
          <v-card-text>
            <v-text-field
              ref="title"
              v-model="title"
              label="Titel"
              placeholder="bijv. Docent datastructures"
              :rules="titleRules"
              required
            ></v-text-field>
            <v-text-field
              ref="description"
              v-model="description"
              label="Beschrijving"
              placeholder="bijv. De wereld van data in een notendop"
            ></v-text-field>
            <v-text-field
              ref="coordinator"
              v-model="coordinator"
              label="Contactpersoon"
              placeholder="bijv. Slobodanka Dzebric"
              :rules="coordinatorRules"
              required
            ></v-text-field>
            <v-text-field
              ref="period"
              v-model="period"
              label="Periode"
              placeholder="bijv. Blok 3|2019-2020"
            ></v-text-field>
            <v-autocomplete
              ref="type"
              v-model="type"
              :items="types"
              label="Type"
              placeholder="bijv. Deeltijd"
            ></v-autocomplete>
            <v-autocomplete
              ref="task"
              v-model="task"
              :items="typesOfTask"
              label="Taak"
              placeholder="bijv. Onderwijs"
              :rules="taskRules"
              required
            ></v-autocomplete>
            <v-text-field
              ref="contactHours"
              v-model="contactHours"
              label="Contacturen"
              placeholder="bijv. 16 hours"
              :rules="contactHoursRules"
              required
            ></v-text-field>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="true"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="startDate"
                  label="Startdatum"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                  :rules="dateRules"
                  required
                ></v-text-field>
              </template>
              <v-date-picker v-model="startDate" :min="currentDate" no-title scrollable/>
            </v-menu>
            <v-menu
              ref="secondMenu"
              v-model="secondMenu"
              :close-on-content-click="true"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-ytr
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="endDate"
                  label="Einddatum"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                  :rules="dateRules"
                  required
                ></v-text-field>
              </template>
              <v-date-picker v-model="endDate" :min="currentDate" no-title scrollable/>
            </v-menu>
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="send()">Versturen</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
      <ResponseDialog ref="responseDialog"/>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import HeaderTitle from "@/components/HeaderTitle.vue";
import ResponseDialog from "@/components/ResponseDialog";

export default {
  data: () => ({
    type: "",
    types: ["Voltijd", "Deeltijd", "Anders"],
    task: "",
    typesOfTask: [
      "Onderwijs",
      "Neventaken onderwijs",
      "Persoonlijke taken",
      "Stages",
      "Afstudeerstages",
      "werkgroepen/commissies"
    ],
    taskRules: [
      v => !!v || "Taak is verplicht",
      v => (v && v.length <= 255) || "Taak moet korter zijn dan 255 karakters"
    ],
    title: "",
    titleRules: [
      v => !!v || "Titel is verplicht",
      v => (v && v.length <= 255) || "Titel moet korter zijn dan 255 karakters"
    ],
    description: "",
    coordinator: "",
    coordinatorRules: [
      v => !!v || "Contactpersoon is verplicht",
      v =>
        (v && v.length <= 255) ||
        "Contactpersoon moet korter zijn dan 255 karakters"
    ],
    period: "",
    contactHours: "",
    contactHoursRules: [
      v => !!v || "Contacturen is verplicht",
      v =>
        (v && v.length <= 255) ||
        "Contacturen moet korter zijn dan 255 karakters"
    ],
    dateRules: [v => !!v || "Date is required"],
    menu: false,
    secondMenu: false,
    startDate: "",
    endDate: "",
    openSlots: 1,
    periods: ["Sem 1", "Sem 2", "Blok 1", "Blok 2", "Blok 3", "Blok 4"],

    currentDate: new Date().toISOString()
  }),
  components: {
    HeaderTitle,
    ResponseDialog
  },
  methods: {
    send() {
      if (this.$refs.form.validate()) {
        axios
          .post(
            "http://localhost:3000/api/Vacancies",
            {
              title: this.title,
              description: this.description,
              contactPerson: this.coordinator,
              schoolYear: this.calculateSchoolYear(this.startDate),
              period: this.period,
              typeCourse: this.getType(this.type),
              typeTask: this.task,
              contactHours: this.contactHours,
              startDate: this.startDate,
              endDate: this.endDate,
              openSlots: this.openSlots
            },
            { withCredentials: true }
          )
          .then(response => {
            if (response.status == 200) {
              this.openResponseDialog(response.status);
            }
          })
          .catch(error => {
            if (error.response.status == 400) {
              this.openResponseDialog(error.response.status);
            }
          });
      }
    },
    //Replaces the given type with it's shortened version
    getType(type) {
      if (type === "Voltijd") {
        return "VT";
      } else if (type === "Deeltijd") {
        return "DT";
      } else {
        return "Onbekend";
      }
    },
    //Calculates the schoolYear the vacancy is in using the startDate as input
    calculateSchoolYear(input) {
      var date = new Date(input);
      if (date.getMonth() < 8) {
        //Check if date is before September
        return date.getFullYear() - 1 + "-" + date.getFullYear();
      } else {
        return date.getFullYear() + "-" + (date.getFullYear() + 1);
      }
    },
    openResponseDialog(responseStatus) {
      if (responseStatus == 200) {
        this.$refs.responseDialog.open("Nieuwe vacature is aangemaakt", "done");
      } else if (responseStatus == 400) {
        this.$refs.responseDialog.open(
          "Vacature kan niet aangemaakt worden",
          "clear"
        );
      }
    }
  }
};
</script>
