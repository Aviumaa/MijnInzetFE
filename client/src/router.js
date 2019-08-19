import Vue from "vue";
import Router from "vue-router";
import Callback from "./components/callback.vue";
import Dashboard from "./views/Dashboard.vue";
import TaskList from "./views/TaskList.vue";
import Availability from "./views/Availability.vue";
import Vacancies from "./views/Vacancies.vue";
import Users from "./views/Users.vue";
import CreateVacancy from "./views/CreateVacancy.vue";
import EducationTasks from "./views/EducationTasks.vue";
import NonEducationTasks from "./views/NonEducationTasks.vue";
import EditUser from "./views/EditUser.vue";
import Profile from "./views/Profile.vue";
import EditEducationTask from "./views/EditEducationTask.vue";
import EditNonEducationTask from "./views/EditNonEducationTask.vue";
import Home from "./views/Home.vue";

import auth from "./auth/authService.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/callback",
      name: "callback",
      component: Callback
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/taskList",
      name: "taskList",
      component: TaskList
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
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
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

router.beforeEach((to, from, next) => {
  if (to.path === "/" || to.path === "/callback" || auth.isAuthenticated()) {
    return next();
  }

  // Specify the current path as the customState parameter, meaning it
  // will be returned to the application after auth
  auth.login({ target: to.path });
});

export default router;
