<template>
  <v-tabs color="grey lighten-2" fixed-tabs multiple>
    <v-tab
      v-bind:class="{ 'color-text-tabs': {isActiveEducation} }"
      @click.native="navigateTo({name: 'educationTasks'}); isActiveEducation = true"
    >Onderwijstaken</v-tab>
    <v-tab
      v-bind:class="{ 'color-text-tabs': isActiveNonEducation }"
      @click.native="navigateTo({name: 'nonEducationTasks'}); isActiveNonEducation = true"
    >Niet Onderwijstaken</v-tab>
  </v-tabs>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
      console.log(this.isActiveNonEducation);
      console.log(this.isActiveEducation);
    }
  },
  props: {
    isActiveEducation: Boolean,
    isActiveNonEducation: Boolean
  }
};
</script>

<style>
.color-text-tabs {
  color: primary !important;
  font-weight: 700;
}
</style>