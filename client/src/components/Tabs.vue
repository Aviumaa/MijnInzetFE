<template>
  <v-tabs color="grey lighten-2" fixed-tabs multiple>
    <v-tab @click.native="navigateTo({name: 'educationTasks'})">
      Onderwijstaken
    </v-tab>
    <v-tab @click.native="navigateTo({name: 'nonEducationTasks'})">
      Niet Onderwijstaken
    </v-tab>
  </v-tabs>
</template>

<script>
    export default {
        data() {
            return {
   
            }
        },
        methods: {
    navigateTo(route) {
      this.$router.push(route);
    }
  },
    }
</script>

<style lang="scss" scoped>

</style>