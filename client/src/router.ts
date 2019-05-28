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
let decoded: any;

if (cookie !== null) {
  decoded = jwt_decode(cookie);
} else {
  cookie = setCookie(
    "testToken",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    1
  );
}

function setCookie(name: any, value: any, days: any) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name: any) {
  let v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
}

function guard(to: any, from: any, next: { (): void; (arg0: string): void }) {
  if (cookie !== undefined) {
    jwt_decode(cookie);
    next();
  } else {
    next("/"); // go to '/login';
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
      props: { token: decoded }
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
      props: { token: decoded }
    },
    {
      path: "/vacancies",
      name: "vacancies",
      beforeEnter: guard,
      component: Vacancies,
      props: { token: decoded }
    },
    {
      path: "/createvacancy",
      name: "createvacancy",
      beforeEnter: guard,
      component: CreateVacancy
    }
  ]
});
