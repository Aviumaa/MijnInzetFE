<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="studyunit"
            v-model="studyunit"
            label="Study unit"
            placeholder="e.g. Datastructures"
          ></v-text-field>
          <v-text-field
            ref="description"
            v-model="description"
            label="Description"
            placeholder="e.g. About the structures of data"
          ></v-text-field>
          <v-text-field
            ref="modulecoordinator"
            v-model="modulecoordinator"
            label="Module coordinator"
            placeholder="e.g. Slobodanka Dzebric"
          ></v-text-field>
          <v-text-field
            ref="timespan"
            v-model="timespan"
            label="Timespan"
            placeholder="e.g. Blok 3"
          ></v-text-field>
          <v-autocomplete
            ref="type"
            v-model="type"
            :items="types"
            label="Type"
            placeholder="e.g. Deeltijd"
          ></v-autocomplete>
          <v-text-field
            ref="contacttime"
            v-model="contacttime"
            label="Contact hours per week"
            placeholder="e.g. 16 hours"
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          
          <v-spacer></v-spacer>
          
          <v-btn color="primary" flat @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from "@/components/Panel.vue";

export default {
  data:() => ({
    types: ['Voltijd', 'Deeltijd', 'Anders']
  }),
  components:{
    Panel
  }
};
</script>