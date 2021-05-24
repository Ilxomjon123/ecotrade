import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signin",
    name: "Login",
    component: Login,
  },
  {
    path: "*",
    redirect: "/",
  },
  {
    path: "/sellers/profile",
    component: Profile,
    meta: {
      auth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");
  const isAdmin = !loggedIn ? false : JSON.parse(loggedIn).accessToken;

  if (to.matched.some((record) => record.meta.auth) && !isAdmin) {
    next("/signin");
    return;
  }
  next();
});

export default router;
