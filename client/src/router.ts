import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login.vue";
import Home from "./views/Home.vue";
import Report from "./views/Report.vue";
import Availability from "./views/Availability.vue";
import Vacancies from "./views/Vacancies.vue";
import CreateVacancy from "./views/CreateVacancy.vue";
import jwt_decode from "jwt-decode";

Vue.use(Router);

let cookie: any = getCookie("token");
let decoded: any = jwt_decode(cookie);

function getCookie(name: any) {
  let v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
}

function guard(to: any, from: any, next: { (): void; (arg0: string): void }) {
  if (cookie !== null) {
    next();
  } else {
    next("/login"); // go to '/login';
  }
}

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "home",
      beforeEnter: guard,
      component: Home,
      props: { token: decoded.role }
    },
    {
      path: "/reports",
      name: "reports",
      beforeEnter: guard,
      component: Report
    },
    {
      path: "/availability",
      name: "availability",
      beforeEnter: guard,
      component: Availability,
      props: { token: decoded.id }
    },
    {
      path: "/vacancies",
      name: "vacancies",
      beforeEnter: guard,
      component: Vacancies,
      props: { token: decoded.id }
    },
    {
      path: "/createvacancy",
      name: "createvacancy",
      beforeEnter: guard,
      component: CreateVacancy
    }
  ]
});
