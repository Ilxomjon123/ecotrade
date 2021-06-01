<template>
  <div>
    <b-form @submit.prevent="onSubmit" class="p-2 bg-light m-5">
      <b-form-group label="Nomi:">
        <b-form-input v-model="form.name" type="text" required></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-file
          @input="imageUpload"
          accept=".jpg, .png, .gif"
          v-model="image"
        ></b-form-file>
      </b-form-group>
      <b-form-group label="Tasnif:">
        <editor
          api-key="maf5d5cmdz73at7pcujnkatb57j1j428e4flg31x7o5vgmws"
          v-model="form.description"
          :init="{
            menubar: false,
            plugins: [
              'advlist autolink lists link image charmap print preview anchor',
              'searchreplace visualblocks code fullscreen',
              'insertdatetime media table paste code help wordcount',
            ],
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help',
          }"
        />
      </b-form-group>
      <b-form-group label="Narxi:">
        <b-form-input
          v-model="form.price"
          type="number"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Bonus:">
        <b-form-input
          v-model="form.bonusPrice"
          type="number"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Soni:">
        <b-form-input
          v-model="form.amount"
          type="number"
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
        price: "",
        amount: "",
        bonusPrice: "",
        description: "",
        imageUrl: "",
      },
    };
  },
  methods: {
    ...mapActions(["uploadImage", "addProduct"]),
    async imageUpload() {
      const res = await this.uploadImage(this.image);
      this.form.imageUrl = res.imageUrl;
    },
    async onSubmit() {
      const res = await this.addProduct(this.form);
      if (res) {
        this.$toast("Mahsulot qo'shildi", {
          timeout: 2000,
        });
        this.$router.push({ path: "/admin" });
      } else {
        this.$toast("Mahsulot qo'shishda xatolik. Qayta urinib ko'ring", {
          timeout: 2000,
        });
      }
    },
  },
};
</script>
