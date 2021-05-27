<template>
  <div class="content">
    <div class="row">
      <categories class="col-lg-4 col-sm-12" />
      <carusel class="col-lg-8 col-sm-12" />
    </div>
    <products class="mt-3" />
  </div>
</template>
<script>
import Carusel from "../components/Carusel";
import Categories from "../components/Categories";
import Products from "../components/Products";
export default {
  components: { Carusel, Categories, Products },
};
</script>

<style scoped>
.content {
  padding: 3vw;
}
</style>
