<template>
  <div class="header">
    <h1 class="header__title">{{title}}</h1>
    <p class="header__subTitle">{{subTitle}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["title", "subTitle"]
};
</script>

<style>
.header {
  margin-bottom: 0.5em;
  padding: 0.25em 0.5em;
  border-left: 0.4em solid black;
}

.header__title {
  text-transform: uppercase;
}

.header__subTitle {
  margin: 0;
}
</style>
