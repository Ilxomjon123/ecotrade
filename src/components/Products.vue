<template>
  <div>
    <b-card-group columns id="products">
      <b-card
        v-for="item in getAllProducts"
        :key="item.id"
        :title="item.name"
        :img-src="
          item.imageUrl
            ? item.imageUrl
            : 'https://picsum.photos/300/300/?image=41'
        "
        img-alt="Image"
        img-height="300"
      >
        <b-card-text v-html="item.description.substr(0, 20) + '...'" />
        <template #footer>
          <div class="row">
            <div class="col-auto">
              <p class="text-muted h4">{{ item.price }} so'm</p>
            </div>
            <div class="col-auto">
              <b-button
                pill
                variant="warning"
                class="text-white"
                @click="pick(item)"
                >Xarid qilish</b-button
              >
            </div>
          </div>
        </template>
      </b-card>
    </b-card-group>
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
      size: 30,
    };
  },
  created() {
    this.fetchAllProducts({ pageNumber: this.pageNumber, size: this.size });
  },
  methods: {
    ...mapActions(["fetchAllProducts"]),
    ...mapMutations(["setProduct"]),
    async paginate(page) {
      if (page > 1) {
        this.currentPage = page - 1;
      }
      await this.fetchAllProducts({
        pageNumber: page - 1,
        size: this.size,
      });
    },
    pick(product) {
      this.setProduct(product);
      this.$router.push({ path: "/product/" + product.id });
    },
  },
  computed: {
    ...mapGetters(["getAllProducts", "getAllProductsCount"]),
  },
};
</script>
