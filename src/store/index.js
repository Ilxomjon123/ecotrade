import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

axios.defaults.baseURL = "https://nusratillo-springboot-app.herokuapp.com";
Vue.use(Vuex);

export const state = {
  temporaryJwt: null,
  phoneNumber: null,
  allProducts: [],
  allProductsCount: 0,
  product: {},
  links: [],
  cart: [],
  profile: {},
  paymenHistory: [],
  lastStat: [],
  linkStat: [],
};
export const getters = {
  getPhoneNumber: (state) => state.phoneNumber,
  isLogged: () => !(JSON.parse(localStorage.getItem("user")) === null),
  getAllProducts: (state) => state.allProducts,
  getAllProductsCount: (state) => state.allProductsCount,
  getProduct: (state) => state.product,
  getLinks: (state) => state.links,
  getCart: (state) => state.cart,
  getProfile: (state) => state.profile,
  getPaymentHistory: (state) => state.paymenHistory,
  getLastStat: (state) => state.lastStat,
  getLinkStat: (state) => state.linkStat,
};
export const mutations = {
  setProduct(state, payload) {
    state.product = payload;
  },
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
  setLinks(state, payload) {
    state.links = payload;
  },
  setCart(state, payload) {
    state.cart = payload;
  },
  setProfile(state, payload) {
    state.profile = payload;
  },
  setPaymentHistory(state, payload) {
    state.paymenHistory = payload;
  },
  setLinkStat(state, payload) {
    state.linkStat = payload;
  },
  setLastStat(state, payload) {
    state.lastStat = payload;
  },
};
export const actions = {
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

  async fetchProductById(payload) {
    const res = await axios.get(`api/product/${payload}`);
    if (res.status == 200) {
      return res.data;
    }
    return false;
  },

  async fetchProductByLinkId(payload) {
    const res = await axios.get(`api/product/link/${payload}`);
    if (res.status == 200) {
      return res.data;
    }
    return false;
  },

  async fetchOrder({ commit, state }, payload) {
    const res = await axios.post("/api/product/order", { ...payload });
    if (res.status == 200) {
      commit("setCart", res.data);
      return true;
    }
    return false;
  },

  async fetchCreateLink({ commit, state }, payload) {
    const res = await axios.post(
      "/api/links/" + payload,
      {},
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    if (res.status == 200) {
      return true;
    }
    return false;
  },
  async fetchLinks({ commit, state }) {
    const res = await axios.get("/api/links", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).accessToken
        }`,
      },
    });
    if (res.status == 200) {
      commit("setLinks", res.data);
      return true;
    }
    return false;
  },
  async destroyLink({ commit, state }, payload) {
    const res = await axios.delete("/api/links/" + payload, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).accessToken
        }`,
      },
    });
    if (res.status == 200) {
      return true;
    }
    return false;
  },
  async fetchCart({ commit, state }) {
    const res = await axios.get("/api/cart", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).accessToken
        }`,
      },
    });
    if (res.status == 200) {
      commit("setCart", res.data);
      return true;
    }
    return false;
  },
  async fetchProfile({ commit, state }) {
    const res = await axios.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).accessToken
        }`,
      },
    });
    if (res.status == 200) {
      commit("setProfile", res.data);
      return true;
    }
    return false;
  },
  async fetchPaymentHistory({ commit, state }) {
    const res = await axios.get("/api/user/payment_history", {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).accessToken
        }`,
      },
    });
    if (res.status == 200) {
      commit("setPaymentHistory", res.data);
      return true;
    }
    return false;
  },
  async fetchPay({ commit, state }, payload) {
    const res = await axios.post(
      "/api/user/pay",
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).accessToken
          }`,
        },
      }
    );
    if (res.status == 200) {
      return true;
    }
    return false;
  },
  async fetchLastStat({ commit, state }) {
    const res = await axios.get("/api/links/statistics?byOrder=" + true, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).accessToken
        }`,
      },
    });
    if (res.status == 200) {
      commit("setLastStat", res.data);
      return true;
    }
    return false;
  },
  async fetchLinkStat({ commit, state }) {
    const res = await axios.get("/api/links/statistics?byOrder=" + false, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).accessToken
        }`,
      },
    });
    if (res.status == 200) {
      commit("setLinkStat", res.data);
      return true;
    }
    return false;
  },
};
export const modules = {};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules,
});
