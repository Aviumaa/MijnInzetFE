import Vue from "vue";
import Router from "vue-router";
import Login from "./components/Login.vue";
import Home from "./views/Home.vue";
import Report from "./views/Report.vue";
import Availability from "./views/Availability.vue";
import Vacancies from "./views/Vacancies.vue";
import Users from "./views/Users.vue";
import CreateVacancy from "./views/CreateVacancy.vue";
import jwt_decode from "jwt-decode";
import EducationTasks from "./views/EducationTasks.vue";
import NonEducationTasks from "./views/NonEducationTasks.vue";
import EditUser from "./views/EditUser.vue";
import Profile from "./views/Profile.vue";
import EditEducationTask from "./views/EditEducationTask.vue";
import EditNonEducationTask from "./views/EditNonEducationTask.vue";

Vue.use(Router);

let cookie: any = getCookie("token");
let decoded: any;

if (cookie !== null) {
  decoded = jwt_decode(cookie);
}

function getCookie(name: any) {
  let v = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
}

function guard(to: any, from: any, next: { (): void; (arg0: string): void }) {
  if (cookie !== null) {
    next();
  } else {
    next("/");
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
    },
    {
      path: "/educationTasks",
      name: "educationTasks",
      component: EducationTasks
    },
    {
      path: "/nonEducationTasks",
      name: "nonEducationTasks",
      component: NonEducationTasks
    },
    {
      path: "/users",
      name: "users",
      component: Users
    },
    {
      path: "/users/edit",
      name: "editUser",
      component: EditUser
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/educationTasks/edit",
      name: "editEducation",
      component: EditEducationTask
    },
    {
      path: "/nonEducationTasks/edit",
      name: "editNonEducationTasks",
      component: EditNonEducationTask
    }
  ]
});
