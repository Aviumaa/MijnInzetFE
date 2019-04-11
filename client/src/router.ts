import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login.vue";
import Home from "./views/Home.vue";
import Report from "./views/Report.vue";
import Roster from "./views/Roster.vue";
import Enroll from "./views/Enroll.vue";
import Vacancies from "./views/Vacancies.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/reports",
      name: "reports",
      component: Report
    },
    {
      path: "/roster",
      name: "roster",
      component: Roster
    },
    {
      path: "/enroll",
      name: "enroll",
      component: Enroll
    },
    {
      path: "/vacancies",
      name: "vacancies",
      component: Vacancies
    },
  ]
});
