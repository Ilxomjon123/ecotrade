<template>
  <div class="p-4">
    <nav class="nav nav-borders justify-content-center mb-4">
      <div>
        <b-button-group>
          <b-link to="/sellers/profile" class="btn btn-dark"
            ><b-icon icon="person" /> Profile</b-link
          >
          <b-link to="/sellers/products" class="btn btn-primary"
            ><b-icon icon="cart" /> Mahsulotlar</b-link
          >
          <b-link to="/sellers/links" class="btn btn-dark"
            ><b-icon icon="people" /> Oqim</b-link
          >
          <b-link to="/sellers/statistics" class="btn btn-dark"
            ><b-icon icon="graph-up" /> Statistika</b-link
          >
        </b-button-group>
      </div>
    </nav>
    <products />
  </div>
</template>

<script>
import Products from "../../components/sellers/Products";
export default {
  components: { Products },
};
</script>
