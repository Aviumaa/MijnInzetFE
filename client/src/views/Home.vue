<template>
  <div class="container">
    <h1>Homepage</h1>
    <h3>Team MijnInzet</h3>
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$auth.isAuthenticated() === true) {
      this.$router.push("dashboard");
    }
  }
};
</script>