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
    <div class="row">
      <div class="col-md-12 ml-auto mr-auto">
        <div class="page-categories">
          <ul
            class="nav nav-pills nav-pills-warning nav-pills-icons justify-content-center mb-3"
            role="tablist"
          >
            <li class="nav-item">
              <a
                class="nav-link text-white"
                data-toggle="tab"
                href="#link7"
                role="tablist"
              >
                <b-icon icon="bar-chart" /> Oqim bo'yicha
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link text-white active show"
                data-toggle="tab"
                href="#link8"
                role="tablist"
              >
                <b-icon icon="bar-chart-steps" /> Oxirgi so'rovlar
              </a>
            </li>
          </ul>
          <div class="tab-content tab-space tab-subcategories">
            <div class="tab-pane" id="link7">
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
                        <tr class="text-center">
                          <td>
                            Mashina uchun yomg'irdan himoyalovchi vosita
                          </td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="tab-pane active show" id="link8">
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
                          <th>#</th>
                          <th>Oqim</th>
                          <th>Buyurtmachi</th>
                          <th>Address</th>
                          <th>Holat</th>
                          <th>Izoh</th>
                          <th>Sana</th>
                        </tr>
                      </thead>
                      <tbody></tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
