<template>
  <div class="p-4">
    <nav class="nav nav-borders justify-content-center mb-4">
      <div>
        <b-button-group>
          <b-link to="/sellers/products" class="btn btn-dark"
            ><b-icon icon="cart" /> Mahsulotlar</b-link
          >
          <b-link to="/sellers/links" class="btn btn-primary"
            ><b-icon icon="people" /> Oqim</b-link
          >
          <b-link to="/sellers/statistics" class="btn btn-dark"
            ><b-icon icon="graph-up" /> Statistika</b-link
          >
        </b-button-group>
      </div>
    </nav>
    <div class="row">
      <b-card-group columns v-if="getLinks.length">
        <b-card
          v-for="item in getLinks"
          :key="item.id"
          border-variant="primary"
          header-bg-variant="primary"
          header-text-variant="white"
          align="center"
          :header="item.product.name"
        >
          <b-input :value="item.url" :disabled="true"></b-input>

          <b-button
            class="m-2"
            variant="success"
            type="button"
            v-clipboard:copy="item.url"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >
            Nusxa olish
          </b-button>
          <b-button class="m-2" variant="danger" @click="destroy(item.id)">
            <b-icon icon="trash" />
          </b-button>
        </b-card>
      </b-card-group>
      <h1 v-else class="text-center">Oqim yaratimagan</h1>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  created() {
    this.fetchLinks();
  },
  computed: { ...mapGetters(["getLinks"]) },
  methods: {
    ...mapActions(["fetchLinks", "destroyLink"]),
    onCopy: function(e) {
      this.$toast("Oqim linki nusxalandi", {
        timeout: 5000,
      });
    },
    onError: function(e) {
      alert("Failed to copy texts");
    },
    async destroy(id) {
      await this.destroyLink(id);
      await this.fetchLinks();
    },
  },
};
</script>
