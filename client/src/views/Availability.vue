<template>
  <v-container>
    <v-layout row>
      <v-flex>
        <HeaderTitle title="Beschikbaarheid"/>

        <v-layout row class="list-availability">
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
          <v-btn @click="sendAvailability" round dark>Opslaan</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
import HeaderTitle from "@/components/HeaderTitle.vue";

moment.locale("nl");

export default {
  data() {
    return {
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
      userTimeslotData: []
    };
  },
  components: {
    HeaderTitle
  },
  props: ["token"],
  methods: {
    isChecked(value) {
      return this.checkboxes.includes(value);
    },
    sendAvailability(checkboxes) {
      axios
        .put(`http://localhost:3000/api/timeslots/${this.token.id}`, {
          timeslots: this.checkboxes
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    parseJsonToString() {
      const timeslots = [];
      this.userTimeslotData.forEach(userTimeSlot => {
        let dayOfWeek = JSON.stringify(userTimeSlot.day_of_week);
        let startTime = JSON.stringify(userTimeSlot.start_time);

        startTime = startTime.substring(1, startTime.length - 1);

        const timeslot = dayOfWeek + "-" + startTime;

        timeslots.push(timeslot);
      });

      this.checkboxes = timeslots;
    }
  },
  mounted() {
    axios
      .get(`http://localhost:3000/api/timeslots/${this.token.id}`)
      .then(response => {
        this.userTimeslotData = response.data;
        this.parseJsonToString();
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
@media (max-width: 700px) {
  .list-availability {
    flex-direction: column;
  }
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
