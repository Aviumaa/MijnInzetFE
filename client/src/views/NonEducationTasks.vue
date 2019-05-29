<template>
  <div>
    <tabs v-bind:class="{ 'color-text-tabs': isActiveNonEducation }"></tabs>
    <H1>Geen Onderwijstaken</H1>
  </div>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
export default {
  data() {
    return {};
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
