<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-link to="/"
        ><b-navbar-brand><b>Asl-Shifo</b></b-navbar-brand></b-link
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
            ><b-link to="/" class="text-white">Asosiy</b-link></b-nav-item
          >
          <b-nav-item
            ><b-link to="/about-us" class="text-white"
              >Biz haqimizda</b-link
            ></b-nav-item
          >
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input
              v-model="word"
              size="sm"
              class="mr-sm-2"
              placeholder="Qidiruv..."
            ></b-form-input>
            <b-button size="sm" @click="search"
              ><b-icon icon="search"
            /></b-button>
          </b-nav-form>
          <router-link to="/sellers/profile">
            <b-nav-form>
              <b-button size="sm" class="rounded-circle my-2 my-sm-0 ml-2">
                <b-icon icon="person-circle" />
              </b-button>
            </b-nav-form>
          </router-link>
          <router-link to="/cart">
            <b-button size="sm" class="rounded-circle my-2 my-sm-0 ml-2">
              <b-icon icon="cart" />
            </b-button>
          </router-link>
          <b-nav-form v-if="isLogged">
            <b-button
              size="sm"
              class="rounded-circle my-2 my-sm-0 ml-2 bg-danger"
              @click="logout"
            >
              <b-icon icon="arrow-bar-right" />
            </b-button>
          </b-nav-form>
          <b-nav-form v-if="isAdmin">
            <router-link
              size="sm"
              class="rounded-circle my-2 my-sm-0 ml-2 bg-danger"
              to="/admin"
            >
              <b-icon icon="arrow-bar-right" />
            </router-link>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      word: "",
      isAdmin:
        localStorage.getItem("user") &&
        JSON.parse(localStorage.getItem("user")).role == "Role_ADMIN",
      isLogged: !(localStorage.getItem("user") === null),
    };
  },
  methods: {
    ...mapActions(["fetchCart", "fetchSearch"]),
    logout() {
      localStorage.removeItem("user");
      this.$router.push({ path: "/" });
      location.reload();
    },
    async search() {
      await this.fetchSearch(this.word);
      this.$toast("Qidiruv yakunlandi");
      this.$router.push({ path: "/search" });
    },
  },
};
</script>
