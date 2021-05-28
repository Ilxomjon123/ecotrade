import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import Toast from "vue-toastification";
import VueClipboard from "vue-clipboard2";

import "./registerServiceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-toastification/dist/index.css";
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
const options = {
  // You can set your default options here
};
Vue.use(Toast, options);
Vue.use(VueClipboard);
Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
