<template>
  <b-list-group>
    <b-list-group-item v-for="item in categories" :key="item">{{
      item
    }}</b-list-group-item>
  </b-list-group>
</template>
<script>
export default {
  data() {
    return {
      categories: [
        "Medtexnika",
        "Sovg'alar",
        "Uy-hovli uchun",
        "Avtomobillar uchun",
        "Foydali maxsulotlar",
        "Erkaklar uchun",
        "Ayollar uchun",
        "Kitoblar",
        "Telefonlar",
      ],
    };
  },
};
</script>
