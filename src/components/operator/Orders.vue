<template>
  <div>
    <h4 class="text-white">Balans: {{ getOperatorSumm }} So'm</h4>
    <div class="table-responsive">
      <table class="table table-bordered table-hover text-center bg-light mt-2">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>
              <b-form-select
                :options="addresses"
                v-model="address"
                @change="change"
              ></b-form-select>
            </th>
            <th>
              <b-form-select
                v-model="productId"
                :options="products"
                @change="change"
              ></b-form-select>
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <b-form-select
                v-model="status"
                :options="statuses"
                @change="change"
              ></b-form-select>
            </th>
            <th></th>
          </tr>
          <tr>
            <th>Buyurtmachi</th>
            <th>Telefon raqami</th>
            <th>Manzil</th>
            <th>Mahsulot</th>
            <th>Soni</th>
            <th>Tasnif</th>
            <th>Mahsulot narxi</th>
            <th>Buyurtma vaqti</th>
            <th>Holati</th>
            <th>O'zgartirish</th>
          </tr>
        </thead>
        <tbody v-if="getOperatorOrders.length > 0">
          <tr v-for="item in getOperatorOrders" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.phoneNumber }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.product.name }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.product.price }} So'm</td>
            <td>{{ item.createdDate.substr(0, 10) }}</td>
            <td>{{ item.status }}</td>
            <td>
              <b-button
                v-if="item.status == 'NEW' || item.status == 'RECALL'"
                v-b-modal.modal-1
                variant="info"
                @click="pickItem(item)"
                ><b-icon icon="pencil"
              /></b-button>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="8" class="bg-light">
              {{ status }} holatida buyurtmalar mavjud emas
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal id="modal-1" title="BootstrapVue" hide-footer ref="my-modal">
      <b-form @submit.prevent="updateStatus">
        <b-form-select
          v-model="pickedItem.status"
          :options="statuses"
          @change="change"
        ></b-form-select>
        <b-form-textarea
          v-model="comment"
          rows="3"
          max-rows="6"
          class="mt-2 mb-1"
        ></b-form-textarea>
        <b-button variant="success" type="submit">Saqlash</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  async created() {
    await this.fetchAllProducts({ pageNumber: 0, size: 1000 });
    await this.fetchOperatorOrders({
      status: "NEW",
      region: null,
      productId: null,
    });
    await this.fetchOperatorSumm();
  },
  async mounted() {
    this.products = await this.getAllProducts.map((item) => {
      return {
        value: item.id,
        text: item.name,
      };
    });
    console.log(this.products);
    this.products = [{ value: null, text: "Tanlang" }, ...this.products];
  },
  data() {
    return {
      products: [],
      productId: null,
      address: null,
      comment: "",
      status: "NEW",
      itemStatus: "NEW",
      pickedItem: {},
      statuses: [
        { value: "NEW", text: "Yangi" },
        { value: "READY_FOR_DELIVERY", text: "Yetkazish uchun tayyor" },
        { value: "THEN_TAKE", text: "Keyin oladi" },
        { value: "DELIVERED", text: "Yetkazildi" },
        { value: "ARCHIVED", text: "Arxivlandi" },
        { value: "DEFECTIVE_PRODUCT", text: "Yaroqsiz mahsulot" },
        { value: "CANCELED", text: "Bekor qilindi" },
      ],
      addresses: [
        { value: null, text: "Tanlang" },
        { value: "Toshkent", text: "Toshkent" },
        { value: "Namangan", text: "Namangan" },
        { value: "Andijon", text: "Andijon" },
        { value: "Fargona", text: "Fargona" },
        { value: "Jizzax", text: "Jizzax" },
        { value: "Sirdaryo", text: "Sirdaryo" },
        { value: "Samarqand", text: "Samarqand" },
        { value: "Buxoro", text: "Buxoro" },
        { value: "Navoiy", text: "Navoiy" },
        { value: "Qoraqalpog'iston", text: "Qoraqalpog'iston" },
        { value: "Xorazm", text: "Xorazm" },
        { value: "Surxondaryo", text: "Surxondaryo" },
        { value: "Qashqadaryo", text: "Qashqadaryo" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getOperatorOrders", "getOperatorSumm", "getAllProducts"]),
  },
  methods: {
    ...mapActions([
      "fetchOperatorOrders",
      "editOrder",
      "fetchOperatorSumm",
      "fetchAllProducts",
    ]),
    change() {
      const status = this.status;
      const region = this.address;
      const productId = this.productId;
      this.fetchOperatorOrders({ status, region, productId });
    },
    updateStatus() {
      const newStatus = this.pickedItem.status;
      const comment = this.comment;
      const orderId = this.pickedItem.id;
      const res = this.editOrder({ newStatus, comment, orderId });
      this.$refs["my-modal"].hide();
      this.fetchOperatorOrders(this.status);
      if (res) {
        this.$toast("Status yangilandi!");
      } else {
        this.$toast("Xatolik yuz berdi. Qayta urinib ko'ring!");
      }
    },
    pickItem(order) {
      this.pickedItem = order;
    },
  },
};
</script>
