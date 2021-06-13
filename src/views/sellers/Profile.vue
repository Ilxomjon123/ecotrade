<template>
  <div class="p-4">
    <nav class="nav nav-borders justify-content-center mb-4">
      <div>
        <b-button-group>
          <b-link to="/sellers/profile" class="btn btn-primary"
            ><b-icon icon="person" /> Profile</b-link
          >
          <b-link to="/sellers/products" class="btn btn-dark"
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
    <div class="row mb-4">
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-header card-header-warning card-header-icon">
            <div class="card-icon"></div>
            <h3 class="text-dark text-center">
              <b-icon icon="group" />
              <b>Tashriflar</b> <br />
              <b>{{ getProfile.visitorsCount }}</b>
            </h3>
          </div>
          <div class="card-footer">
            <div class="stats">
              <a href="#pablo">Siz orqali tashrif buyurganlar soni</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-header card-header-primary card-header-icon">
            <div class="card-icon"></div>
            <h3 class="text-dark text-center"><b>Asosiy balansda</b></h3>

            <h3 class="card-title text-center">
              {{ getProfile.balance }} So'm
            </h3>
          </div>
          <div class="card-footer">
            <div class="stats">
              <a href="#pablo">Sizning hisobingizdagi bonuslar</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="card card-stats">
          <div class="card-header card-header-danger card-header-icon">
            <div class="card-icon"></div>
            <h3 class="text-dark text-center">
              <b>Nechta sotdingiz</b> <br /><b>{{
                getProfile.soldProductsCount
              }}</b>
            </h3>
          </div>
          <div class="card-footer">
            <div class="stats">
              <a href="#pablo">Siz sotishga yordam bergan mahsulotlar soni</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-4">
      <div class="col-md-12">
        <div class="card ">
          <div class="card-header card-header-rose card-header-icon">
            <div class="card-icon"></div>
            <h4 class="card-title">To'lov</h4>
          </div>
          <div class="card-body ">
            <p class="text-center">
              Diqqat! karta raqamingizni xato kiritmaganingizga amin bo'ling
              chunki o'zgartirilmaydi!
            </p>
            <b-form class="form-horizontal" @submit.prevent="onSubmit">
              <div class="row">
                <label class="col-md-3 col-form-label">Karta raqamingiz</label>
                <div class="col-md-9">
                  <div class="form-group has-default bmd-form-group">
                    <input
                      type="number"
                      class="form-control"
                      v-model="cardNumber"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <label class="col-md-3 col-form-label">Summani kiriting</label>
                <div class="col-md-9">
                  <div class="form-group bmd-form-group is-filled">
                    <input
                      type="number"
                      class="form-control"
                      placeholder="Kamida 40 000so'm yechishingiz mumkin"
                      min="40000"
                      v-model="summa"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <b-button variant="success" class="float-right" type="submit">
                    Yuborish
                  </b-button>
                </div>
              </div>
            </b-form>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12">
      <div class="card">
        <div class="card-header card-header-rose card-header-icon">
          <div class="card-icon"></div>
          <div>
            <h4 class="card-title">Balans tarihi</h4>
          </div>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Sana</th>
                  <th>Hisob raqam</th>
                  <th>Summa</th>
                  <th>Holat</th>
                  <th>Izoh</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      summa: "",
      cardNumber: "",
    };
  },
  created() {
    this.fetchProfile();
  },
  methods: {
    ...mapActions(["fetchProfile", "fetchPaymentHistory", "fetchPay"]),
    async onSubmit(e) {
      const cardNumber = this.cardNumber;
      const summa = this.summa;
      const res = await this.fetchPay({ cardNumber, summa });
      if (res) {
        this.$toast(
          "So'rovingiz qabul qilindi. Tez orada operatorlarimiz siz bilan bog'lanishadi",
          {
            timeout: 2000,
          }
        );
      } else {
        this.$toast("Xatolik yuz berdi. Qayta urinib ko'ring", {
          timeout: 2000,
        });
      }
    },
  },
  computed: {
    ...mapGetters(["getProfile", "getPaymentHistory"]),
  },
};
</script>
