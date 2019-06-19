<template>
  <v-container>
    <v-layout row>
      <v-flex class="center">
        <div class="upperRow">
          <HeaderTitle title="Vacatures"></HeaderTitle>
          <v-btn
            v-if="authToken.role == '1'"
            @click="navigateTo({name: 'createvacancy'})"
            fab
            dark
            color="indigo darken-4"
          >
            <v-icon dark>add</v-icon>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import HeaderTitle from "@/components/HeaderTitle.vue";

export default {
  data() {
    return {};
  }
};
</script>