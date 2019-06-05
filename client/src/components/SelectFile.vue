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
const Papa = require('papaparse');

export default {
  data: {
      file: null
  },
  mounted(){
      document.getElementById("fileSelector").onchange = function() {
        let file = document.getElementById("fileSelector").files[0];
        if (file) {
            var data = Papa.parse(file, {
                complete: function(results){
                    console.log(results.data);
                }
            });
            this.file = data;
        }
    }
  }
}
</script>