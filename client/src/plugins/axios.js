import Vue from "vue";
import axios from "axios";

export default {
  install() {
    Vue.prototype.$axios = axios;
  }
};
