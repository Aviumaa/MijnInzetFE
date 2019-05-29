<template>
  <v-app>
    <v-tabs fixed-tabs>
      <v-tab
      v-for="n  in 2"
      :key="n"
      ripple  
      >{{ tabheaders[n-1] }}</v-tab>
    <v-tab-item
    v-for="n in 2"
    :key="n"
    >
    <div v-if="n == 1">
        <Tab1></Tab1>
    </div>
    <div v-if="n == 2">
      <h1>hoi</h1>
    </div>
    </v-tab-item>
  </v-tabs>
  </v-app>
</template>

<script>
import Tab1 from '@/components/Tab1.vue';

export default {
  components: {
    Tab1
  },
  data() {
    return {
      tabs: null,
      tabheaders: ["Onderwijstaken", "Niet onderwijstaken"]
    };
  }
};
</script>

<style>
.color-text-tabs {
  color: primary !important;
  font-weight: 700;
}
</style>