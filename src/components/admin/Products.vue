<template>
  <div>
    <router-link
      to="admin/product-add"
      class="btn btn-success float-right mb-2"
    >
      <b-icon icon="plus" />
    </router-link>
    <table class="table table-hover table-bordered bg-light text-center">
      <thead>
        <tr>
          <th>Rasm</th>
          <th>Nomi</th>
          <th>Narxi</th>
          <th>Bonus</th>
          <th>Soni</th>
          <th>Tasnif</th>
          <th>Amallar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in getAllProducts" :key="item.id">
          <td>
            <img
              width="100"
              :src="
                item.imageUrl
                  ? item.imageUrl
                  : 'https://picsum.photos/300/300/?image=41'
              "
            />
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>{{ item.bonusPrice }}</td>
          <td>{{ item.amount }}</td>
          <td v-html="item.description.substr(0, 20)"></td>
          <td>
            <b-button variant="info" size="sm" @click="edit(item)"
              ><b-icon icon="pencil"
            /></b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <b-pagination
      v-model="currentPage"
      :total-rows="getAllProductsCount"
      :per-page="size"
      aria-controls="products"
      align="center"
      @change="paginate"
    ></b-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      currentPage: 1,
      pageNumber: 0,
      size: 10,
    };
  },
  created() {
    this.fetchAllProducts({ pageNumber: this.pageNumber, size: this.size });
  },
  methods: {
    ...mapActions(["fetchAllProducts"]),
    ...mapMutations(["setProduct"]),
    edit(product) {
      this.$router.push({ path: "/admin/product-edit/" + product.id });
    },
    async paginate(page) {
      if (page > 1) {
        this.currentPage = page - 1;
      }
      await this.fetchAllProducts({
        pageNumber: page - 1,
        size: this.size,
      });
    },
  },
  computed: {
    ...mapGetters(["getAllProducts", "getAllProductsCount"]),
  },
};
</script>
