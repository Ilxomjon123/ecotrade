<template>
  <div class="card mt-5 mr-1 ml-1">
    <div class="card-body">
      <h3 class="card-title mb-2">Sizning Buyurtmalaringiz</h3>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Mahsulot nomi</th>
              <th>Soni</th>
              <th>Narxi</th>
              <th>Holati</th>
              <th>Izoh</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in getCart" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.amount }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.status }}</td>
              <td>{{ item.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
