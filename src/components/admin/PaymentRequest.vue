<template>
  <div class="table-responsive">
    <table class="table bg-light table-hover table-bordered">
      <thead>
        <th>Telefon raqami</th>
        <th>Pul miqdori</th>
        <th>Kartochka raqami</th>
        <th>Holati</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in getPaymentRequests" :key="index">
          <td>{{ item.phoneNumber }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.cardNumber }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  async created() {
    await this.fetchPaymentRequests();
  },
  methods: {
    ...mapActions(["fetchPaymentRequests"]),
  },
  computed: {
    ...mapGetters(["getPaymentRequests"]),
  },
};
</script>
