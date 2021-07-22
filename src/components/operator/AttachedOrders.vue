<template>
  <div>
    <div class="table-responsive">
      <table class="table table-bordered table-hover text-center bg-light mt-2">
        <thead>
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
        <tbody v-if="getAttachedOrders.length > 0">
          <tr v-for="item in getAttachedOrders" :key="item.id">
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
              <b-button-group>
                <b-button
                  v-if="item.status == 'NEW' || item.status == 'RECALL'"
                  v-b-modal.modal-2
                  variant="info"
                  @click="pickItem(item)"
                  ><b-icon icon="pencil"
                /></b-button>
              </b-button-group>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="10" class="bg-light">
              {{ status }} holatida buyurtmalar mavjud emas
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal
      id="modal-2"
      title="BootstrapVue"
      hide-footer
      ref="my-attached-modal"
    >
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
    await this.fetchAttachedOrders();
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
    };
  },
  computed: {
    ...mapGetters(["getAttachedOrders"]),
  },
  methods: {
    ...mapActions(["fetchAttachedOrders", "editOrder"]),
    async change() {
      await this.fetchAttachedOrders();
    },
    async updateStatus() {
      const newStatus = this.pickedItem.status;
      const comment = this.comment;
      const orderId = this.pickedItem.id;
      const res = await this.editOrder({ newStatus, comment, orderId });
      this.$refs["my-attached-modal"].hide();
      if (res) {
        this.$toast("Status yangilandi!");
        await this.change();
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
