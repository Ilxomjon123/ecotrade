<template>
  <div>
    <b-card-group columns id="products">
      <b-card
        class="shadow"
        v-for="item in getAllProducts"
        :key="item.id"
        :title="item.name"
        :img-src="
          item.image ? item.image : 'https://picsum.photos/300/300/?image=41'
        "
        img-alt="Image"
        img-top
      >
        <hr />
        <p class="h4 font-weight-light bg-primary p-2">
          <b>Narxi: </b> {{ item.price }} So'm
        </p>
        <hr />
        <p class="h5 font-weight-light">
          <b>Bonus: </b>{{ item.bonusPrice }} So'm
        </p>
        <p class="h5 font-weight-light"><b>Qoldi: </b>{{ item.amount }}</p>
        <button
          @click="createLink(item.id)"
          class="btn btn-danger btn-sm col-sm-12 mt-3"
        >
          <b-icon icon="link" /> Oqim yaratish
        </button>
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
    ...mapActions(["fetchAllProducts", "fetchCreateLink"]),
    async paginate(page) {
      if (page > 1) {
        this.currentPage = page - 1;
      }
      await this.fetchAllProducts({
        pageNumber: page - 1,
        size: this.size,
      });
    },
    async createLink(id) {
      const res = await this.fetchCreateLink(id);
      if (res) {
        this.$toast("Oqim yaratildi!", {
          timeout: 2000,
        });
        this.$router.push({ path: "/sellers/links" });
      } else
        this.$toast("Xatoli ro'y berdi. Qayta urinib ko'ring", {
          timeout: 2000,
        });
    },
  },
  computed: {
    ...mapGetters(["getAllProducts", "getAllProductsCount"]),
  },
};
</script>
