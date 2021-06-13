<template>
  <div class="content">
    <div class="row">
      <carusel class="col-lg-12" />
    </div>
    <products class="mt-3" />
  </div>
</template>
<script>
import Carusel from "../components/Carusel";
import Products from "../components/Products";
export default {
  components: { Carusel, Products },
};
</script>

<style scoped>
.content {
  padding: 3vw;
}
</style>
