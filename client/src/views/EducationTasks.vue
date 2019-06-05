<template>
  <div>
    <tabs title="Onderwijstaken"></tabs>
  </div>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
export default {
  data: function() {
    return {};
  },
   mounted() {
    axios
      .get("http://localhost:3000/api/educationalProgram/")
      .then(response => {
        this.vacancies = response.data;
      })
      .catch(error => {
        console.log(error);
      });
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
