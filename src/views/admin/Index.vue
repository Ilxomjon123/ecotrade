<template>
  <div class="p-3">
    <b-tabs content-class="mt-3" align="center" class="text-white">
      <b-tab title="Mahsulotlar" active>
        <products />
      </b-tab>
      <b-tab title="Operatorlar"><p>I'm the second tab</p></b-tab>
      <b-tab title="To'lovlar"><payment-request /></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import PaymentRequest from "../../components/admin/PaymentRequest.vue";
import Products from "../../components/admin/Products.vue";

export default {
  components: {
    Products,
    PaymentRequest,
  },
};
</script>
