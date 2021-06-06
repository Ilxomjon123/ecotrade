<template>
  <!-- Default form login -->
  <div class="container mt-5">
    <div class="raw">
      <div class="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
        <p class="h4 text-center mb-4 text-white">
          ECO<b>Trade</b> Admin Panel
        </p>
        <b-form @submit.prevent="sign_in">
          <b-input
            v-model="phone"
            type="number"
            id="phone"
            class="form-control mb-2"
            placeholder="901234567"
            required
          />
          <b-input
            v-model="password"
            type="text"
            id="password"
            class="form-control mb-2"
            placeholder="Parol"
            required
          />
          <span class="text-danger">{{ error }}</span>
          <b-button variant="success" type="submit" class="form-control">
            <b-spinner small v-if="loading" />Kirish</b-button
          >
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      error: "",
      phone: "",
      password: "",
      loading: false,
      phoneValidated: false,
    };
  },
  methods: {
    ...mapActions(["signinAdmin"]),
    async sign_in() {
      this.loading = true;
      const phoneNumber = this.phone;
      const password = this.password;
      const res = await this.signinAdmin({ phoneNumber, password });
      this.loading = false;
      if (res) {
        const role = JSON.parse(localStorage.getItem("user")).role;
        if (role == "ROLE_ADMIN") {
          this.$router.push({ path: "/admin" });
        } else {
          this.$router.push({ path: "/operator" });
        }
      } else {
        this.error = "Ma'lumotlar noto'g'ri kiritilgan";
      }
    },
  },
};
</script>
