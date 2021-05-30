<template>
  <!-- Default form login -->
  <div class="container mt-5">
    <div class="raw">
      <div class="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
        <p class="h4 text-center mb-4 text-white">ECO<b>Trade</b></p>
        <div v-if="!phoneValidated">
          <b-input
            v-model="phone"
            type="number"
            id="phone"
            class="form-control"
            placeholder="901234567"
          />
          <span class="text-danger">{{ phoneError }}</span>
          <div class="text-center mt-4">
            <b-button variant="primary" @click="sign_in">
              <b-spinner small v-if="phoneLoading" />Yuborish
            </b-button>
          </div>
        </div>
        <div v-else>
          <b-input
            v-model="code"
            type="text"
            id="code"
            class="form-control"
            placeholder="SMS kod"
          />
          <span class="text-danger">{{ codeError }}</span>
          <div class="text-center mt-4">
            <b-button variant="primary" @click="sign_in_confirm">
              <b-spinner small v-if="codeLoading" />Tasdiqlash
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Default form login -->
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      phoneError: "",
      codeError: "",
      phone: "",
      code: "",
      phoneLoading: false,
      codeLoading: false,
      phoneValidated: false,
    };
  },
  computed: {
    ...mapGetters(["getPhoneNumber"]),
  },
  methods: {
    ...mapActions(["signin", "confirm_signin"]),
    async sign_in() {
      this.phoneLoading = true;
      const res = await this.signin(this.phone);
      this.phoneLoading = false;
      if (res) {
        this.phoneValidated = true;
      } else {
        this.phoneError = "Raqam noto'gri kiritilgan";
      }
    },
    async sign_in_confirm() {
      this.codeLoading = true;
      const res = await this.confirm_signin(this.code);
      this.codeLoading = false;
      if (res) {
        this.$router.push({ path: "/sellers/profile" });
        location.reload();
      } else {
        this.codeError = "SMS kod noto'gri kiritilgan";
      }
    },
  },
};
</script>
