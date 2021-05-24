import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

axios.defaults.baseURL = "https://nusratillo-springboot-app.herokuapp.com";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    temporaryJwt: null,
    phoneNumber: null,
    allProducts: [],
    allProductsCount: 0,
  },
  getters: {
    getPhoneNumber: (state) => state.phoneNumber,
    isLogged: () => !(JSON.parse(localStorage.getItem("user")) === null),
    getAllProducts: (state) => state.allProducts,
    getAllProductsCount: (state) => state.allProductsCount,
  },
  mutations: {
    setTemproryJwt(state, payload) {
      state.temporaryJwt = payload;
    },
    setPhoneNumber(state, payload) {
      state.phoneNumber = payload;
    },
    setAllProducts(state, payload) {
      state.allProducts = payload;
    },
    setAllProductsCount(state, payload) {
      state.allProductsCount = payload;
    },
  },
  actions: {
    async signin({ commit, state }, phoneNumber) {
      const res = await axios.post("/api/auth/signin", { phoneNumber });
      if (res.status == 200) {
        commit("setTemproryJwt", res.data.temporaryJwt);
        commit("setPhoneNumber", res.data.phoneNumber);
        return true;
      }
      return false;
    },

    async confirm_signin({ commit, state }, code) {
      const res = await axios.post("/api/auth/confirm_signin", {
        temporaryJwt: state.temporaryJwt,
        code,
      });
      if (res.status == 200) {
        localStorage.setItem("user", JSON.stringify(res.data));
        return true;
      }
      return false;
    },

    async fetchAllProducts({ commit, state }, payload) {
      const res = await axios.get(
        `api/product?pageNumber=${payload.pageNumber}&size=${payload.size}`
      );
      if (res.status == 200) {
        commit("setAllProducts", res.data.products);
        commit("setAllProductsCount", res.data.totalElements);
        return true;
      }
      return false;
    },
  },
  modules: {},
});
