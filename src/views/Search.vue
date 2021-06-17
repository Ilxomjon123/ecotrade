<template>
  <div class="m-2 p-2">
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
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["getAllProducts"]),
  },
  methods: {
    ...mapMutations(["setProduct"]),
    pick(product) {
      this.setProduct(product);
      this.$router.push({ path: "/product/" + product.id });
    },
  },
};
</script>
