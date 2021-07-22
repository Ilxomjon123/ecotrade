<template>
  <div class="p-3">
    <h4 class="text-white">Balans: {{ getOperatorSumm }} So'm</h4>

    <b-tabs content-class="mt-3" align="center" class="text-white">
      <b-tab title="Biritirilmagan buyurtmalar" active>
        <orders />
      </b-tab>
      <b-tab title="Biriktirilgan buyurtmalar">
        <attached-orders />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AttachedOrders from "../../components/operator/AttachedOrders.vue";
import Orders from "../../components/operator/Orders.vue";
export default {
  components: {
    Orders,
    AttachedOrders,
  },
  computed: {
    ...mapGetters(["getOperatorSumm"]),
  },
  async created() {
    await this.fetchOperatorSumm();
  },
  methods: {
    ...mapActions(["fetchOperatorSumm"]),
  },
};
</script>
