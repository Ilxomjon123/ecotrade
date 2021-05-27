<template>
  <div class="content m-5">
    <div class="row">
      <b-card-group columns v-if="getLinks.length">
        <b-card
          v-for="item in getLinks"
          :key="item.id"
          border-variant="primary"
          header-bg-variant="primary"
          header-text-variant="white"
          align="center"
          header="item.name"
          ><b-input :value="item.url" disabled="true"></b-input>

          <b-button
            class="mt-2"
            variant="success"
            type="button"
            v-clipboard:copy="item.url"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          >
            Copy!
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
    ...mapActions(["fetchLinks"]),
    onCopy: function(e) {
      alert("You just copied: " + e.text);
    },
    onError: function(e) {
      alert("Failed to copy texts");
    },
  },
};
</script>
