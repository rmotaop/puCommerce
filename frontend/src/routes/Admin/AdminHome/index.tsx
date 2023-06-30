import './styles.css';
import {useEffect, useState} from "react";
import {User} from "../../../types/user";
import * as userService from '../../../services/user-service'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminHome() {

    const [user, setUser] = useState<User>();

    useEffect(() => {
        userService.findMe()
            .then(response => {
                console.log(response.data);
                setUser(response.data)
            })
    },[]);

    return (
        <main>
{/* INÍCIO */}
            <section id="admin-home-section" className="dsc-container">
                <h2 className="dsc-section-title dsc-mb20">Bem-vindo à área administrativa: {user?.name}</h2>
            </section>
{/* DASHBOARD */}
    <section className="section dashboard">
      <div className="row">

        {/* <!-- Left side columns --> */}
        <div className="col-lg-8">
          <div className="row">

            {/* <!-- Sales Card --> */}
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">Vendas <span>| Hoje</span></h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-cart-fill"></i>
                    </div>
                    <div className="ps-3">
                      <h6>145</h6>
                      <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">Evolução</span>

                    </div>
                  </div>
                </div>

              </div>
            </div>
            {/* <!-- End Sales Card --> */}

            {/* <!-- Revenue Card --> */}
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card revenue-card">
                <div className="card-body">
                  <h5 className="card-title">Receita <span>| Mês Atual</span></h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-currency-dollar"></i>
                    </div>
                    <div className="ps-3">
                      <h6>R$3.264,00</h6>
                      <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">Evolução</span>

                    </div>
                  </div>
                </div>

              </div>
            </div>
            {/* <!-- End Revenue Card -->

            <!-- Customers Card --> */}
            <div className="col-xxl-4 col-xl-12">

              <div className="card info-card customers-card">

                <div className="card-body">
                  <h5 className="card-title">Clientes <span>| Ano atual</span></h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-people"></i>
                    </div>
                    <div className="ps-3">
                      <h6>1.244</h6>
                      <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">Redução</span>

                    </div>
                  </div>

                </div>
              </div>

            </div>
            {/* <!-- End Customers Card -->



            <!-- Recent Sales --> */}
            <div className="col-12">
              <div className="card recent-sales overflow-auto">

                <div className="card-body">
                  <h5 className="card-title">Vendas Recentes <span>| Hoje</span></h5>

                  <table className="table table-borderless datatable">
                    <thead>
                      <tr>
                        <th scope="col">Ordem</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Produto</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row"><a href="#">#2457</a></th>
                        <td>Brandon Jacob</td>
                        <td><a href="#" className="text-primary">Mouse logi Gammer</a></td>
                        <td>R$64,90</td>
                        <td><span className="badge bg-success">Aprovado</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#2147</a></th>
                        <td>Kessler Brandon</td>
                        <td><a href="#" className="text-primary">Kit Jardinagem Plus</a></td>
                        <td>R$47,78</td>
                        <td><span className="badge bg-warning">Pendente</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#2049</a></th>
                        <td>Ashleigh Brandon</td>
                        <td><a href="#" className="text-primary">Teclado Tablet At N3</a></td>
                        <td>R$147,45</td>
                        <td><span className="badge bg-success">Aprovado</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#2644</a></th>
                        <td>Brandon Grady</td>
                        <td><a href="#" className="text-primar">Ultra PC Gammer V4</a></td>
                        <td>R$6.799,00</td>
                        <td><span className="badge bg-danger">Rejeitado #C1</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#2644</a></th>
                        <td>Raheem Brandon</td>
                        <td><a href="#" className="text-primary">Refil Aspirador Pó</a></td>
                        <td>R$165,89</td>
                        <td><span className="badge bg-success">Aprovado</span></td>
                      </tr>
                    </tbody>
                  </table>

                </div>
                </div>
                <div className="card recent-sales overflow-auto">
                <div className="card-body">
                  <h5 className="card-title">Vendas Recentes <span>| Hoje</span></h5>

                  <table className="table table-borderless datatable">
                    <thead>
                      <tr>
                        <th scope="col">Ordem</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Produto</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row"><a href="#">#2457</a></th>
                        <td>Brandon Jacob</td>
                        <td><a href="#" className="text-primary">Mouse logi Gammer</a></td>
                        <td>R$64,90</td>
                        <td><span className="badge bg-success">Aprovado</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#2147</a></th>
                        <td>Kessler Brandon</td>
                        <td><a href="#" className="text-primary">Kit Jardinagem Plus</a></td>
                        <td>R$47,78</td>
                        <td><span className="badge bg-warning">Pendente</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#2049</a></th>
                        <td>Ashleigh Brandon</td>
                        <td><a href="#" className="text-primary">Teclado Tablet At N3</a></td>
                        <td>R$147,45</td>
                        <td><span className="badge bg-success">Aprovado</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#2644</a></th>
                        <td>Brandon Grady</td>
                        <td><a href="#" className="text-primar">Ultra PC Gammer V4</a></td>
                        <td>R$6.799,00</td>
                        <td><span className="badge bg-danger">Rejeitado #C1</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#2644</a></th>
                        <td>Raheem Brandon</td>
                        <td><a href="#" className="text-primary">Refil Aspirador Pó</a></td>
                        <td>R$165,89</td>
                        <td><span className="badge bg-success">Aprovado</span></td>
                      </tr>
                    </tbody>
                  </table>

                </div>

              </div>
            </div>
            {/* <!-- End Recent Sales --> */}

          </div>
        </div>
        {/* <!-- End Left side columns --> */}

        {/* <!-- Right side columns --> */}
        <div className="col-lg-4">

          {/* <!-- Recent Activity --> */}
          <div className="card">

            <div className="card-body">
              <h5 className="card-title">Atividades recentes <span>| Hoje</span></h5>

              <div className="activity">

                <div className="activity-item d-flex">
                  <div className="activite-label">32 min</div>
                  <i className='bi bi-circle-fill activity-badge text-success align-self-start'></i>
                  <div className="activity-content">
                    Quia quae rerum <a href="#" className="fw-bold text-dark">explicabo officiis</a> beatae
                  </div>
                </div>
                {/* <!-- End activity item--> */}

                <div className="activity-item d-flex">
                  <div className="activite-label">56 min</div>
                  <i className='bi bi-circle-fill activity-badge text-danger align-self-start'></i>
                  <div className="activity-content">
                    Voluptatem blanditiis blanditiis eveniet
                  </div>
                </div>
                {/* <!-- End activity item--> */}

                <div className="activity-item d-flex">
                  <div className="activite-label">2 hrs</div>
                  <i className='bi bi-circle-fill activity-badge text-primary align-self-start'></i>
                  <div className="activity-content">
                    Voluptates corrupti molestias voluptatem
                  </div>
                </div>
                {/* <!-- End activity item--> */}

                <div className="activity-item d-flex">
                  <div className="activite-label">1 day</div>
                  <i className='bi bi-circle-fill activity-badge text-info align-self-start'></i>
                  <div className="activity-content">
                    Tempore autem saepe <a href="#" className="fw-bold text-dark">occaecati voluptatem</a> tempore
                  </div>
                </div>
                {/* <!-- End activity item--> */}

                <div className="activity-item d-flex">
                  <div className="activite-label">2 days</div>
                  <i className='bi bi-circle-fill activity-badge text-warning align-self-start'></i>
                  <div className="activity-content">
                    Est sit eum reiciendis exercitationem
                  </div>
                </div>
                {/* <!-- End activity item--> */}

                <div className="activity-item d-flex">
                  <div className="activite-label">4 weeks</div>
                  <i className='bi bi-circle-fill activity-badge text-muted align-self-start'></i>
                  <div className="activity-content">
                    Dicta dolorem harum nulla eius. Ut quidem quidem sit quas
                  </div>
                </div>
                {/* <!-- End activity item--> */}

              </div>

            </div>
          </div>
          {/* <!-- End Recent Activity --> */}

          {/* <!-- Budget Report --> */}

          <div className="card">
              <div className=" info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">Budget Report <span>| Mês Atual</span></h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-cart-fill"></i>
                    </div>
                    <div className="ps-3">
                      <h6>345</h6>
                      <span className="text-success small pt-1 fw-bold">32%</span> <span className="text-muted small pt-2 ps-1">Evolução</span>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          <div className="card">
              <div className=" info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">Website Traffic <span>| Hoje</span></h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-cart-fill"></i>
                    </div>
                    <div className="ps-3">
                      <h6>345</h6>
                      <span className="text-success small pt-1 fw-bold">32%</span> <span className="text-muted small pt-2 ps-1">Evolução</span>

                    </div>
                  </div>
                </div>

              </div>
            </div>
          {/* <!-- News & Updates Traffic --> */}

          {/* <!-- End News & Updates --> */}

        </div>
        {/* <!-- End Right side columns --> */}

      </div>
            </section>

{/* LINKS */}

{/* FOOTER */}

            <footer id="footer" className="footer">
             <div className="copyright">
                 &copy; Copyright <strong><span>puCommerce</span></strong>. All Rights Reserved
            </div>
            <div className="credits">
               {/* All the links in the footer should remain intact. --> */}
              {/* <!-- You can delete the links only if you purchased the pro version. --> */}
              {/* <!-- Licensing information: https://bootstrapmade.com/license/ --> */}
              {/* <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/nice-admin-bootstrap-admin-html-template/ --> */}
              Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
             </div>
  </footer>
            
        </main>
    )
}