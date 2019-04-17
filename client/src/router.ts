import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login.vue";
import Home from "./views/Home.vue";
import Report from "./views/Report.vue";
import Roster from "./views/Roster.vue";
import Vacancies from "./views/Vacancies.vue";
import CreateVacancy from "./views/CreateVacancy.vue";

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
      path: "/vacancies",
      name: "vacancies",
      component: Vacancies
    },
    {
      path: "/createvacancy",
      name: "createvacancy",
      component: CreateVacancy
    },
  ]
});
