<template>
  <v-app>
    <v-tabs fixed-tabs>
      <v-tab to="/tab1">Tet</v-tab>
      <v-tab to="/tab1">Tets</v-tab>
      <!-- <v-tabs-items v-model="tabs">
      <v-tab-item v-for="n in 2" :key="n">
        <v-card>
          <router-link to="/tab1"></router-link>
        </v-card>
      </v-tab-item>
      </v-tabs-items>-->
    </v-tabs>
    <router-view></router-view>
  </v-app>
</template>

<script>
import Tab1 from "@/components/Tab1.vue";
export default {
  data() {
    return {
      tabs: null,
      headers: ["Onderwijstaken", "Niet onderwijstaken"]
    };
  },
  component: {
    Tab1
  }
};
</script>

<style>
.color-text-tabs {
  color: primary !important;
  font-weight: 700;
}
</style>