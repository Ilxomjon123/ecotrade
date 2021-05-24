<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from "./components/layouts/Header.vue";
export default {
  components: { Header },
};
</script>

<style lang="css" scoped>
b-card:hover {
  box-shadow: 0 7px 21px 0 rgb(255 0 150 / 10%);
}
.shadow {
  box-shadow: 0 7px 21px 0 rgb(0 0 0 / 10%);
}

@media screen and (min-width: 600px) {
  .row {
    margin-left: -15px;
    margin-right: -15px;
  }

  .row [class*="col"] {
    padding-left: 15px;
    padding-right: 15px;
  }
}

.row {
  margin-left: 0;
  margin-right: 0;
}

.row [class*="col"] {
  padding-left: 0;
  padding-right: 0;
}
</style>
