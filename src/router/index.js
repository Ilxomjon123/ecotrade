import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SellerProducts from "../views/sellers/Products.vue";
import Links from "../views/sellers/Links.vue";
import Cart from "../views/sellers/Cart.vue";
import Profile from "../views/sellers/Profile.vue";
import Statistics from "../views/sellers/Statistics.vue";
import Product from "../views/Product.vue";
import Admin from "../views/admin/Index.vue";
import ProductAdd from "../views/admin/ProductAdd.vue";
import ProductEdit from "../views/admin/ProductEdit.vue";
// search chala tugatish kerak
import Search from "../views/Search.vue";
//
import { actions } from "../store/index.js";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/signin",
    component: Login,
  },
  {
    path: "/search",
    component: Search,
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
    path: "/sellers/products",
    component: SellerProducts,
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
  {
    path: "/sellers/profile",
    component: Profile,
    meta: {
      auth: true,
    },
  },
  {
    path: "/sellers/statistics",
    component: Statistics,
    meta: {
      auth: true,
    },
  },
  {
    path: "/cart",
    component: Cart,
    meta: {
      auth: true,
    },
  },
  {
    path: "/admin",
    component: Admin,
    meta: {
      admin: true,
    },
  },
  {
    path: "/admin/product-add",
    component: ProductAdd,
    meta: {
      admin: true,
    },
  },
  {
    path: "/admin/product-edit/:id",
    component: ProductEdit,
    meta: {
      admin: true,
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
  const isAuth = !loggedIn ? false : JSON.parse(loggedIn).accessToken;
  const isAdmin = loggedIn && JSON.parse(loggedIn).role == "ROLE_ADMIN";
  if (to.matched.some((record) => record.meta.auth) && !isAuth) {
    next("/signin");
    return;
  }
  if (to.matched.some((record) => record.meta.admin) && !isAdmin) {
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
