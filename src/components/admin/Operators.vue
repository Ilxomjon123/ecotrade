<template>
  <div>
    <router-link
      to="admin/operator-add"
      class="btn btn-success float-right mb-2"
    >
      <b-icon icon="plus" />
    </router-link>
    <table class="table table-hover bg-light text-center">
      <thead>
        <tr>
          <th>Nomi</th>
          <th>Telefon raqami</th>
          <th>Amallar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in getAllOperators" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.phoneNumber }}</td>
          <td>
            <b-button variant="danger" size="sm" @click="destroy(item.id)"
              ><b-icon icon="trash"
            /></b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  created() {
    this.fetchAllOperators();
  },
  methods: {
    ...mapActions(["fetchAllOperators", "destroyOperator"]),
    destroy(id) {
      const res = this.destroyOperator(id);
      this.fetchAllOperators();
      if (res) {
        this.$toast("Operator o'chirildi!");
      } else {
        this.$toast("Xatolik yuz berdi. Qayta urinib ko'ring!");
      }
    },
  },
  computed: {
    ...mapGetters(["getAllOperators"]),
  },
};
</script>
