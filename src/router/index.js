import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Profile from "../views/sellers/Profile.vue";
import Links from "../views/sellers/Links.vue";
import Product from "../views/Product.vue";
import { actions, mutations } from "../store/index.js";
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
    path: "/product/:id",
    component: Product,
    meta: {
      productById: true,
    },
  },
  {
    path: "/product/link/:id",
    component: Product,
    meta: {
      productByLinkId: true,
    },
  },
  {
    path: "/sellers/profile",
    component: Profile,
    meta: {
      auth: true,
    },
  },
  {
    path: "/sellers/links",
    component: Links,
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

router.beforeEach(async (to, from, next) => {
  const loggedIn = localStorage.getItem("user");
  const isAdmin = !loggedIn ? false : JSON.parse(loggedIn).accessToken;

  if (to.matched.some((record) => record.meta.auth) && !isAdmin) {
    next("/signin");
    return;
  }
  if (to.matched.some((record) => record.meta.productById)) {
    const product = await actions.fetchProductById(to.params.id);
    localStorage.setItem("product", JSON.stringify(product));
    next();
  }
  if (to.matched.some((record) => record.meta.productByLinkId)) {
    const product = await actions.fetchProductByLinkId(to.params.id);
    localStorage.setItem("product", JSON.stringify(product));
    next();
  }
  next();
});

export default router;
