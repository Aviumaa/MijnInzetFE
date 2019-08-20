import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import App from "./App.vue";
import router from "./router";

import AuthPlugin from "./plugins/auth";
import Axios from "./plugins/axios";

Vue.use(AuthPlugin);
Vue.use(Axios);
Vue.use(Vuetify, {
  iconfont: "md"
});

Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount("#app");
