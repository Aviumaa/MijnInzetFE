<template>
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
</template>

<script>
import Papa from "papaparse";
import axios from "axios";

export default {
  mounted(){
      document.getElementById("fileSelector").onchange = function() {
        let file = document.getElementById("fileSelector").files[0];
        if (file) {
            var data = Papa.parse(file, {
                complete: function(results){
                    results.data.forEach((row) => {
                        if (row[0] != ""){
                            axios.post("http://localhost:3000/api/course",{
                                educationalProgramId: 1,
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
}
</script>