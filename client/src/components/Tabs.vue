<template>
  <v-app>
    <v-tabs fixed-tabs dark>
      <v-tab to="/educationTasks">Onderwijstaken</v-tab>
      <v-tab to="/nonEducationTasks">Niet onderwijstaken</v-tab>
    </v-tabs>
    <h1>{{title}}</h1>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Tab1 from "@/components/Tab1.vue";
export default {
  data() {
    return {};
  },
  component: {
    Tab1
  },
  props: ["title"]
};
</script>

<style>
.color-text-tabs {
  color: primary !important;
  font-weight: 700;
}
</style>