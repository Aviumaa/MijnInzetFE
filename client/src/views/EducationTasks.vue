<template>
  <div>
    <tabs v-bind:class="{ 'color-text-tabs': {isActiveEducation} }"></tabs>
    <H1>Onderwijstaken</H1>
  </div>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
export default {
  data: function() {
    return {
      isActiveEducation: true,
      isActiveNonEducation: false
    };
  },
  components: {
    Tabs
  }
};
</script>

<style>
.color-text-tabs {
  color: primary !important;
  font-weight: 700;
}
</style>
