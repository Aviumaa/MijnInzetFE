import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login.vue";
import Home from "./views/Home.vue";
import Report from "./views/Report.vue";
import Availability from "./views/Availability.vue";
import Vacancies from "./views/Vacancies.vue";
import CreateVacancy from "./views/CreateVacancy.vue";
import Profile from "./views/Profile.vue";

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
      path: "/availability",
      name: "availability",
      component: Availability
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
    {
      path: "/profile",
      name: "profile",
      component: Profile
    }
  ]
});
