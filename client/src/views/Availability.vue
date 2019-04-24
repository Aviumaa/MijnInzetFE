<template>
  <v-container>
    <v-layout row>
      <v-flex class="center">
        <HeaderTitle title="Beschikbaarheid"/>
        
        <v-layout row>
          <v-flex grow v-for="day in weekdays" :key="day.index">
            <v-card>
              <v-card-title class="title text-capitalize font-weight-bold">{{moment.weekdays(day)}}</v-card-title>
              <v-list class="pa-3">
                <div
                  v-for="timeslot in timeslots"
                  :key="timeslot.index"
                  class="border"
                  :class="{ 'checked': isChecked(day + '-' + timeslot)}"
                >
                  {{timeslot}}
                  <input
                    @click="logger"
                    v-model="checkboxes"
                    :value="day + '-' + timeslot"
                    class="border"
                    type="checkbox"
                    label="08:30"
                  >
                </div>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
        <div class="button__submit">
          <v-btn 
          @click="sendAvailability"
          round dark>Opslaan</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
import HeaderTitle from "@/components/HeaderTitle.vue";

// const moment = require("moment");
moment.locale("nl");

export default {
  data() {
    return {
      userId: '1',
      moment: moment,
      checkboxes: [],
      weekdays: [1, 2, 3, 4, 5],
      timeslots: [
        "08:30",
        "09:20",
        "10:10",
        "11:10",
        "12:00",
        "12:50",
        "13:40",
        "14:30",
        "15:20",
        "16:10",
        "17:00",
        "17:50",
        "18:40",
        "19:30",
        "20:20",
        "21:10",
        "22:00"
      ],
      userTimeslots: []
    };
  },
  components: {
    HeaderTitle
  },
  methods: {
    isChecked(value) {
      return this.checkboxes.includes(value);
    },
    logger(event) {
      console.log("checkboxes: " + this.checkboxes);
      console.log(event.target.value);
    },
    sendAvailability(checkboxes) {
      axios.put(`localhost:3000/api/timeslots/${this.userId}`, {
        timeslots: this.checkboxes
      })
      .then (response => {
        console.log(response);
      })
      .catch (error => {
        console.log(error);
      });
      return console.log("sendAvailability: " + this.checkboxes);
    }

    // moment: function() {
    //   return moment();
    // }
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/timeslots/")
      .then(response => {
        this.userTimeslots = response.data;
        console.log(this.userTimeslots);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
grid-container {
  margin: 1em 0;
  padding: 1.5em;
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.schedule--time,
.schedule--day {
  display: grid;
  grid-template-rows: repeat(17, 1fr);
}

div.border {
  display: flex;
  align-items: center;
  padding: 1em;
  border: 1px solid black;
  height: 2.5em;
  color: black;
}

div.border input {
  opacity: 0;
  width: 100%;
  height: inherit;
}

.border.checked {
  background: chartreuse;
}

.button__submit {
  display: flex;
  flex-direction: row-reverse;
  margin: 1em 0;
}
</style>
