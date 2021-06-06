<template>
  <div>
    <b-form @submit.prevent="onSubmit" class="p-2 bg-light m-5">
      <b-form-group label="Telefon qarami:">
        <b-form-input
          v-model="form.phoneNumber"
          type="number"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Nomi:">
        <b-form-input v-model="form.name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Parol:">
        <b-form-input
          v-model="form.password"
          type="text"
          required
        ></b-form-input>
      </b-form-group>
      <router-link class="btn btn-dark mr-2" to="/admin">Orqaga</router-link>
      <b-button type="submit" variant="success">Saqlash</b-button>
    </b-form>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import { mapActions } from "vuex";

export default {
  components: {
    Editor,
  },
  data() {
    return {
      image: null,
      form: {
        name: "",
        phoneNumber: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["addOperator"]),
    async onSubmit() {
      const res = await this.addOperator(this.form);
      if (res) {
        this.$toast("Operator qo'shildi", {
          timeout: 2000,
        });
        this.$router.push({ path: "/admin" });
      } else {
        this.$toast("Operator qo'shishda xatolik. Qayta urinib ko'ring", {
          timeout: 2000,
        });
      }
    },
  },
};
</script>
