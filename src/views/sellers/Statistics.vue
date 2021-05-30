<template>
  <div class="p-4">
    <nav class="nav nav-borders justify-content-center mb-4">
      <div>
        <b-button-group>
          <b-link to="/sellers/profile" class="btn btn-dark"
            ><b-icon icon="person" /> Profile</b-link
          >
          <b-link to="/sellers/products" class="btn btn-dark"
            ><b-icon icon="cart" /> Mahsulotlar</b-link
          >
          <b-link to="/sellers/links" class="btn btn-dark"
            ><b-icon icon="people" /> Oqim</b-link
          >
          <b-link to="/sellers/statistics" class="btn btn-primary"
            ><b-icon icon="graph-up" /> Statistika</b-link
          >
        </b-button-group>
      </div>
    </nav>
    <div class="row">
      <div class="col-md-12 ml-auto mr-auto">
        <b-tabs content-class="mt-3" align="center">
          <b-tab title="Oqim bo'yicha" active>
            <div class="card">
              <div class="card-header card-header-rose card-header-icon">
                <div class="card-icon"></div>
                <h4 class="card-title">Oqimlar bo'yicha statistika</h4>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Oqim nomi</th>
                        <th>Tashrif</th>
                        <th>Yangi</th>
                        <th>Qabul qilindi</th>
                        <th>Yetkazilmoqda</th>
                        <th>Yetkazibberildi</th>
                        <th>Qayta qo'ng'iroq</th>
                        <th>Nosoz mahsulot</th>
                        <th>Bekor qilindi</th>
                        <th>Arxivlandi</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="text-center"
                        v-for="(item, index) in getLinkStat"
                        :key="index"
                      >
                        <td>{{ item.linkName }}</td>
                        <td>{{ item.visitsCount }}</td>
                        <td>{{ item.newOrdersCount }}</td>
                        <td>{{ item.acceptedOrdersCount }}</td>
                        <td>{{ item.enrouteOrdersCount }}</td>
                        <td>{{ item.deliveredOrdersCount }}</td>
                        <td>{{ item.recallOrdersCount }}</td>
                        <td>{{ item.defectiveOrdersCount }}</td>
                        <td>{{ item.cancelledOrdersCount }}</td>
                        <td>{{ item.archivedOrdersCount }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </b-tab>
          <b-tab title="Oxirgi so'rovlar">
            <div class="card">
              <div class="card-header card-header-rose card-header-icon">
                <div class="card-icon"></div>
                <h4 class="card-title">
                  Oqimlar orqali kelgan buyurtmalar to'g'risida
                </h4>
              </div>
              <div class="card-body">
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Oqim</th>
                        <th>Buyurtmachi</th>
                        <th>Address</th>
                        <th>Holat</th>
                        <th>Izoh</th>
                        <th>Sana</th>
                      </tr>
                    </thead>
                    <tbody class="text-center">
                      <tr v-for="(item, index) in getLastStat" :key="index">
                        <td>{{ item.name }}</td>
                        <td>{{ item.user.name }}</td>
                        <td>{{ item.address }}</td>
                        <td>{{ item.status }}</td>
                        <td>{{ item.description }}</td>
                        <td>{{ item.createdDate }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  created() {
    this.fetchLastStat();
    this.fetchLinkStat();
  },
  methods: {
    ...mapActions(["fetchLastStat", "fetchLinkStat"]),
  },
  computed: {
    ...mapGetters(["getLastStat", "getLinkStat"]),
  },
};
</script>
