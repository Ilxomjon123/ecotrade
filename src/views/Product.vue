<template>
  <div class="content bg-white m-2">
    <div class="row">
      <div class="col-sm-6">
        <img
          class="w-100"
          :src="
            getProduct.imageUrl
              ? getProduct.imageUrl
              : 'https://picsum.photos/300/300/?image=41'
          "
        />
      </div>
      <div class="col-sm-6 text-center mt-3">
        <p class="h1 font-weight-light">{{ getProduct.name }}</p>
        <p v-html="getProduct.description"></p>
        <hr />
        <p class="h4 font-weight-light">
          <b>Narxi: </b> {{ getProduct.price }} So'm
        </p>
        <hr />
        <p class="h5 font-weight-light">
          <b>Mahsulot qoldi: </b>{{ getProduct.amount }}
        </p>
        <hr />
        <a href="#form-order" class="text-white btn btn-warning col-sm-8 mr-3"
          ><b-icon icon="cart4" />BUYURTMA BERISH</a
        >
        <hr />
      </div>
    </div>
    <hr />
    <div class="col-sm-12">
      <div class="col-sm-6 mr-auto ml-auto text-center pb-3">
        <b-card
          class="bg-light shadow"
          title="Buyurma berish uchun ma'lumotlarni kiriting"
        >
          <b-form @submit.prevent="onSubmit" id="form-order">
            <b-form-group>
              <b-form-input
                v-model="form.name"
                placeholder="Ismingizni kiriting"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-input
                v-model="form.phoneNumber"
                type="number"
                placeholder="Telefon raqami (901234567)"
                pattern=".{9,9}"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <b-form-select
                v-model="form.address"
                :options="addresses"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group>
              <b-form-input
                v-model="form.amount"
                type="number"
                placeholder="Soni"
                required
              ></b-form-input>
            </b-form-group>
            <button
              class="text-white btn btn-warning col-sm-8 mr-3"
              type="submit"
            >
              <b-icon icon="cart4" />BUYURTMA BERISH
            </button>
          </b-form>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  created() {
    this.getProduct = JSON.parse(localStorage.getItem("product"));
    localStorage.removeItem("product");
  },
  data() {
    return {
      getProduct: {},
      form: {
        name: "",
        phoneNumber: "",
        address: "",
        amount: 1,
      },
      addresses: [
        "Toshkent",
        "Namangan",
        "Andijon",
        "Fargona",
        "Jizzax",
        "Sirdaryo",
        "Samarqand",
        "Buxoro",
        "Navoiy",
        "Qoraqalpog'iston",
        "Xorazm",
        "Surxondaryo",
        "Qashqadaryo",
      ],
      show: true,
    };
  },
  methods: {
    ...mapActions(["fetchOrder"]),
    onSubmit(e) {
      const form = this.form;
      const productId = this.getProduct.id;
      const linkId = this.$router.currentRoute.params.id;
      let res;
      if (this.$router.currentRoute.meta.productByLinkId) {
        res = this.fetchOrder({ ...form, linkId });
      } else {
        res = this.fetchOrder({ ...form, productId });
      }
      if (res)
        this.$toast("Buyurtma qabul qilindi!", {
          timeout: 2000,
        });
      else
        this.$toast("Xatolik yuz berdi qayta urinib ko'ring!", {
          timeout: 2000,
        });
      this.$router.push({ path: "/products" });
    },
  },
};
</script>
