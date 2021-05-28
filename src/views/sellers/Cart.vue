<template>
  <div>
    <b-table>
      <b-table striped hover :items="getCart"></b-table>
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  async created() {
    await this.fetchCart();
  },
  methods: {
    ...mapActions(["fetchCart"]),
  },
  computed: {
    ...mapGetters(["getCart"]),
  },
};
</script>
