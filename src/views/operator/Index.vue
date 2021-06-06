<template>
  <div class="p-3">
    <b-form-select
      v-model="status"
      :options="statuses"
      @change="change"
    ></b-form-select>
    <div class="table-responsive">
      <table class="table table-hover text-center bg-white mt-2">
        <thead>
          <tr>
            <th>Buyurtmachi</th>
            <th>Telefon raqami</th>
            <th>Manzil</th>
            <th>Mahsulot</th>
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
            <td>{{ item.link.product.name }}</td>
            <td>{{ item.link.product.price }} SO'M</td>
            <td>{{ item.createdDate.substr(0, 10) }}</td>
            <td>{{ item.status }}</td>
            <td>
              <b-button v-b-modal.modal-1 variant="info" @click="pickItem(item)"
                ><b-icon icon="menu-up"
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
  created() {
    this.fetchOperatorOrders(this.status);
  },
  data() {
    return {
      comment: "",
      status: "NEW",
      itemStatus: "NEW",
      pickedItem: {},
      statuses: [
        { value: "NEW", text: "NEW" },
        { value: "RECALL", text: "RECALL" },
        { value: "ACCEPTED", text: "ACCEPTED" },
        { value: "ARCHIVE", text: "ARCHIVE" },
        { value: "ENROUTE", text: "ENROUTE" },
        { value: "DEFECTIVE_PRODUCT", text: "DEFECTIVE_PRODUCT" },
        { value: "CANCELED", text: "CANCELED" },
      ],
    };
  },
  computed: {
    ...mapGetters(["getOperatorOrders"]),
  },
  methods: {
    ...mapActions(["fetchOperatorOrders", "editOrder"]),
    change() {
      this.fetchOperatorOrders(this.status);
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
