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
    <!-- SelectFile -->
    <div style="border: 1px solid black">
        <div class="btn">
          <span>Kies een bestand...</span><br>
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
const Papa = require('papaparse');


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
    console.log(this.educationalProgram.id);
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

    let xxid = this.educationalProgram.id;
    document.getElementById("fileSelector").onchange = function() {
        let file = document.getElementById("fileSelector").files[0];
        if (file) {
            var data = Papa.parse(file, {
                complete: function(results){
                    results.data.forEach((row) => {
                        console.log(row);
                        if (row[0] != ""){
                            axios.put("http://localhost:3000/api/course",{
                                educationalProgramId: xxid,
                                title: row[0],
                                ects: row[1],
                                period: row[2],
                                type: row[3]
                            })
                            .then(response => {
                                if (response.status === 201) {
                                    console.log(response);
                                }
                            });
                        }
                    })
                }
            });
        }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>