<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div v-resize="onResize" column>
    <v-tabs class="tabs" fixed-tabs dark>
      <v-tab to="/educationTasks">Onderwijstaken</v-tab>
      <v-tab to="/nonEducationTasks">Neventaken</v-tab>
    </v-tabs>
    <v-container class="tabs-container">
      <v-data-table
        v-if="showEducationTasks()"
        :headers="headers"
        :items="educationalPrograms"
        :item-key="this.educationalPrograms.id"
        class="elevation-1"
        :hide-headers="isMobile"
        :class="{mobile: isMobile}"
      >
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ props.header.text }}</span>
            </template>
            <span>{{ props.header.text }}</span>
          </v-tooltip>
        </template>
        <template v-slot:items="props">
          <tr v-if="!isMobile">
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-left">todo</td>
            <td class="text-xs-left">{{ props.item.study }}</td>
            <td class="text-xs-left">{{ props.item.year }}</td>
            <v-btn small color="primary" @click="navigateTo('editEducation', props.item)">
              <v-icon>edit</v-icon>
            </v-btn>
          </tr>
          <tr v-else>
            <td>
              <ul class="flex-content">
                <li class="flex-item" :data-label="headers[0].text">{{ props.item.title }}</li>
                <li class="flex-item" :data-label="headers[1].text">todo</li>
                <li class="flex-item" :data-label="headers[2].text">{{ props.item.study }}</li>
                <li class="flex-item" :data-label="headers[3].text">{{ props.item.year }}</li>
                <li color="primary" @click="navigateTo('editEducation', props.item)">
                  <v-icon>edit</v-icon>
                </li>
              </ul>
            </td>
          </tr>
        </template>
      </v-data-table>
      <v-data-table
        v-if="!showEducationTasks()"
        :headers="headers"
        :items="nonEducationalPrograms"
        :item-key="this.nonEducationalPrograms.id"
        class="elevation-1"
        :hide-headers="isMobile"
        :class="{mobile: isMobile}"
      >
        <template slot="headerCell" slot-scope="props">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <span v-on="on">{{ props.header.text }}</span>
            </template>
            <span>{{ props.header.text }}</span>
          </v-tooltip>
        </template>
        <template v-slot:items="props">
          <tr v-if="!isMobile">
            <td class="text-xs-left">{{ props.item.title }}</td>
            <td class="text-xs-left">todo</td>
            <td class="text-xs-left">{{ props.item.study }}</td>
            <td class="text-xs-left">{{ props.item.year }}</td>
            <v-btn small color="primary" @click="navigateTo('editEducation', props.item)">
              <v-icon>edit</v-icon>
            </v-btn>
          </tr>
          <tr v-else>
            <td>
              <ul class="flex-content">
                <li class="flex-item" :data-label="headers[0].text">{{ props.item.title }}</li>
                <li class="flex-item" :data-label="headers[1].text">todo</li>
                <li class="flex-item" :data-label="headers[2].text">{{ props.item.study }}</li>
                <li class="flex-item" :data-label="headers[3].text">{{ props.item.year }}</li>
                <li color="primary" @click="navigateTo('editEducation', props.item)">
                  <v-icon>edit</v-icon>
                </li>
              </ul>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      headers: [
        {
          text: "Naam",
          align: "left",
          value: "name"
        },
        { text: "Coordinator", align: "left", value: "coordinator" },
        { text: "Studierichting", align: "left", value: "study" },
        { text: "Studiejaar", align: "left", value: "year" },
        { text: "Bewerken", align: "left", value: "year", sortable: false }
      ],
      educationalPrograms: [],
      nonEducationalPrograms: [],
      isMobile: false
    };
  },
  methods: {
    navigateTo(route, educationalProgram) {
      this.$router.push({
        name: route,
        params: { educationalProgram: educationalProgram }
      });
    },
    showEducationTasks: function() {
      return this.$route.path.indexOf("/educationTasks") === 0;
    },
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/educationalProgram/schoolRelated", {
        withCredentials: true
      })
      .then(response => {
        this.educationalPrograms = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get("http://localhost:3000/api/educationalProgram/nonSchoolRelated", {
        withCredentials: true
      })
      .then(response => {
        this.nonEducationalPrograms = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  props: ["title"]
};
</script>

<style>
.tabs {
  position: relative;
  width: 100vw;
  left: calc(-50vw + 50%);
}

.tabs-container {
  padding-top: 0;
}

.color-text-tabs {
  color: primary !important;
  font-weight: 700;
}

.application--wrap {
  min-height: 75vh;
  background-color: white;
}

.mobile {
  color: #333;
}

@media screen and (max-width: 768px) {
  .mobile table.v-table tr {
    max-width: 100%;
    position: relative;
    display: block;
  }

  .mobile table.v-table tr:nth-child(odd) {
  }

  .mobile table.v-table tr:nth-child(even) {
    background: #f1f1f1;
  }

  .mobile table.v-table tr td {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    height: auto;
    padding: 10px;
  }

  .mobile table.v-table tr td ul li:before {
    content: attr(data-label);
    padding-right: 0.5em;
    text-align: left;
    display: block;
    color: #545454;
  }
  .v-datatable__actions__select {
    width: 50%;
    margin: 0px;
    justify-content: flex-start;
  }
  .mobile .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
    background: transparent;
  }

  .tabs-container {
    padding: unset;
  }
}
.flex-content {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.flex-item {
  padding: 5px;
  width: 50%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.flex-item::before {
  font-weight: 900;
}
</style>
