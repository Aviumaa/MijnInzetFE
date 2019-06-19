<template>
  <div v-resize="onResize" column>
    <v-data-table
      :headers="headers"
      :items="this.courses"
      :rows-per-page-items="rowsPerPageItems"
      class="elevation-1"
      :hide-headers="isMobile"
      :class="{mobile: isMobile}"
    >
      <template v-slot:items="props">
        <tr v-if="!isMobile">
          <td>{{ props.item.title }}</td>
          <td class="text-xs-left">{{ props.item.ects }}</td>
          <td class="text-xs-left">{{ props.item.period }}</td>
          <td class="text-xs-left">{{ props.item.type }}</td>
        </tr>
        <tr v-else>
          <td>
            <ul class="flex-content">
              <li class="flex-item" :data-label="headers[0].text">{{ props.item.title }}</li>
              <li class="flex-item" :data-label="headers[1].text">{{ props.item.ects }}</li>
              <li class="flex-item" :data-label="headers[2].text">{{ props.item.period }}</li>
              <li class="flex-item" :data-label="headers[3].text">{{ props.item.type }}</li>
            </ul>
          </td>
        </tr>
      </template>
    </v-data-table>
    <!-- SelectFile -->
    <div class="file-container">
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
    <!-- /SelectFile -->
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
      educationalProgram: "",
      rowsPerPageItems: [15, 20, 30, 40],
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
      courses: [],
      isMobile: false
    };
  },
  methods: {
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    }
  },
  mounted() {
    this.educationalProgram = this.$route.params.educationalProgram;
    axios
      .get(
        `http://localhost:3000/api/educationalProgramCourse/${
          this.educationalProgram.id
        }`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        this.courses = response.data[0].courses;
      })
      .catch(error => {
        console.log(error);
      });

    let eduProgramId = this.educationalProgram.id;
    document.getElementById("fileSelector").onchange = function() {
        let file = document.getElementById("fileSelector").files[0];
        if (file) {
            var data = Papa.parse(file, {
                complete: function(results){
                  axios.delete("http://localhost:3000/api/course/deleteAll/" + eduProgramId, {
                      withCredentials: true
                    });

                    results.data.forEach((row) => {
                        try{
                        if (row[1] != "ECTS" && row != ""){
                            axios.post("http://localhost:3000/api/course",{
                                educationalProgramId: eduProgramId,
                                title: row[0],
                                ects: row[1],
                                period: row[2],
                                type: row[3]
                            }, {
                              withCredentials: true
                            })
                            .then(response => {
                                if (response.status === 201) {
                                    console.log(response);
                                }
                            });
                        }
                        }
                        catch (err){
                          console.log(err);
                        }
                    });
                }
              } catch (err) {
                console.log(err);
              }
            });
          }
        });
      }
    };
  }
};
</script>

<style>
.file-container {
  border: 1px solid black;
  padding: 1em;
}
</style>
