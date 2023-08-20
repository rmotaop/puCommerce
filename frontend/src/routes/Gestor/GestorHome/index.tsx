import './styles.css';
import {useEffect, useState} from "react";
import {User} from "../../../types/user";
import * as userService from '../../../services/user-service'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import cartFill from '../../../assets/img/cart-fill.svg';
import cartfull from '../../../assets/img/cartfull.svg';
import creditcards from '../../../assets/img/creditcards.svg';
import dollarG from '../../../assets/img/dollarG.svg';
import arrowdown from '../../../assets/img/arrowdown.svg';
import arrowup from '../../../assets/img/arrowup.svg';
import usuario from '../../../assets/img/user.svg';
import dollar from '../../../assets/img/dollar.svg';
import people from '../../../assets/img/people.svg';
import budget from '../../../assets/img/budget.svg';
import website from '../../../assets/img/website.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../../../components/Footer';

export default function GestorHome() {

    const [user, setUser] = useState<User>();

    return (
        <main>
{/* INÍCIO */}
            <section id="admin-home-section" className="dsc-container">
                <h2 className="dsc-section-title dsc-mb20">Bem-vindo à sua loja virtual </h2>
            </section>
{/* DASHBOARD */}
    <section className="section dashboard">
      <div className="row">

        {/* <!-- Left side columns --> */}
        <div className="col-lg-12">
          <div className="row">

          {/* <!-- ========== title-wrapper end ========== --> */}
         
            <div className="col-xl-3 col-lg-4 col-sm-6">

            <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">Novos pedidos <span>| Hoje</span></h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                       <img className="img" src={cartfull} alt="dollarG"/>
                    </div>
                    <div className="ps-3">
                          
                      <h6>R$74.867</h6>
                      <img className="img" src={arrowup} alt="arrowUp"/> <span className="text-success small pt-1 fw-bold"> -3.15% </span> <span className="text-muted small pt-2 ps-1"> (30 days)</span>

                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- End Icon Cart --> */}
            </div>
            {/* <!-- End Col --> */}
            <div className="col-xl-3 col-lg-4 col-sm-6">

            <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">Total de renda <span>| Hoje</span></h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                       <img className="img" src={dollarG} alt="dollarG"/>
                    </div>
                    <div className="ps-3">
                          
                      <h6>R$54.867</h6>
                      <img className="img" src={arrowup} alt="arrowUp"/> <span className="text-success small pt-1 fw-bold"> -5.45% </span> <span className="text-muted small pt-2 ps-1">Aumentou</span>

                    </div>
                  </div>
                </div>
              </div>

             {/* <!-- End Icon Cart --> */}
            </div>
            {/* <!-- End Col --> */}
            <div className="col-xl-3 col-lg-4 col-sm-6">

              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">Total de despesas <span>| Hoje</span></h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                       <img className="img" src={creditcards} alt="arrowUp"/>
                    </div>
                    <div className="ps-3">
                          
                      <h6>R$24.567</h6>
                      <img className="img" src={arrowdown} alt="arrowUp"/> <span className="text-success small pt-1 fw-bold"> -2.00% </span> <span className="text-muted small pt-2 ps-1">Redução</span>

                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- End Icon Cart --> */}
            </div>
            {/* <!-- End Col --> */}
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">Visitantes <span>| Hoje</span></h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <img className="img" src={usuario} alt="usuario"/>
                    </div>
                    <div className="ps-3">
                      <h6>345</h6>
                      <img className="img" src={arrowdown} alt="arrowdown"/> <span className="text-danger small pt-1 fw-bold"> -9.00% </span> <span className="text-muted small pt-2 ps-1">Redução</span>

                    </div>
                  </div>
                </div>

              </div>
              {/* <!-- End Icon Cart --> */}
            </div>
            {/* <!-- End Col --> */}
          
          {/* <!-- End Row --> */}
            {/* <!-- Sales Card --> */}
            <div className="col-xxl-4 col-md-6">
              <div className="card info-card sales-card">
                <div className="card-body">
                  <h5 className="card-title">Vendas <span>| Hoje</span></h5>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <img className="img" src={cartFill} alt="carrinhos"/>
                    </div>
                    <div className="ps-3">
                      <h6>45</h6>
                      <img className="img" src={arrowup} alt="arrowUp"/> <span className="text-success small pt-1 fw-bold"> 7.00% </span> <span className="text-muted small pt-2 ps-1">Evolução</span>

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
                    <img className="img" src={dollar} alt="dollar"/>


                    </div>
                    <div className="ps-3">
                      <h6>R$933.264,00</h6>
                      <img className="img" src={arrowup} alt="arrowUp"/> <span className="text-success small pt-1 fw-bold"> 4.00% </span> <span className="text-muted small pt-2 ps-1">Evolução</span>

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
                    <img className="img" src={people} alt="people"/>
                    </div>
                    <div className="ps-3">
                      <h6>844</h6>
                      <img className="img" src={arrowdown} alt="arrowdown"/> <span className="text-danger small pt-1 fw-bold"> -2.00% </span> <span className="text-muted small pt-2 ps-1">Conversão</span>

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
                        <td>BranGon Xacob</td>
                        <td><a href="#" className="text-primary">Teclado logiPedi Gammer</a></td>
                        <td>R$564,90</td>
                        <td><span className="badge bg-success">Aprovado</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#2147</a></th>
                        <td>Yessler Drandon</td>
                        <td><a href="#" className="text-primary">Portão eletrônico</a></td>
                        <td>R$1.247,78</td>
                        <td><span className="badge bg-warning">Pendente</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#2049</a></th>
                        <td>Kifhleigh Trandon</td>
                        <td><a href="#" className="text-primary">Tablet S9 Samsunb</a></td>
                        <td>R$12.447,45</td>
                        <td><span className="badge bg-success">Aprovado</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#2644</a></th>
                        <td>Prandon Erady</td>
                        <td><a href="#" className="text-primary">PC Gammer V9</a></td>
                        <td>R$26.799,00</td>
                        <td><span className="badge bg-warning">Em análise</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#2644</a></th>
                        <td>Jaheem Orandon</td>
                        <td><a href="#" className="text-primary">Refil Máquina Corte</a></td>
                        <td>R$65,89</td>
                        <td><span className="badge bg-success">Aprovado</span></td>
                      </tr>
                    </tbody>
                  </table>

                </div>
                </div>
                <div className="card recent-sales overflow-auto">
                <div className="card-body">
                  <h5 className="card-title">Novos produtos <span>| Importação</span></h5>

                  <table className="table table-borderless datatable">
                    <thead>
                      <tr>
                        <th scope="col">Ordem Compra</th>
                        <th scope="col">Importador</th>
                        <th scope="col">Lote Produtos</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row"><a href="#">#USD_2427</a></th>
                        <td>United States</td>
                        <td><a href="#" className="text-primary">Container PS5 e periféricos</a></td>
                        <td>$345.764</td>
                        <td><span className="badge bg-success">Shipping</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#INV_2127</a></th>
                        <td>France Air</td>
                        <td><a href="#" className="text-primary">Perfumes 1º linha</a></td>
                        <td>$56.547</td>
                        <td><span className="badge bg-success">Custons</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#CHI_2029</a></th>
                        <td>Hong Kong Shipp</td>
                        <td><a href="#" className="text-primary">Multimarcas Tenis 1ª linha </a></td>
                        <td>$1.456.947</td>
                        <td><span className="badge bg-success">Airport check</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#UNITED_2624</a></th>
                        <td>United Kigdon</td>
                        <td><a href="#" className="text-secondary">Lote Notebooks Dell</a></td>
                        <td>$266.799</td>
                        <td><span className="badge bg-secondary">Alfandega BRL</span></td>
                      </tr>
                      <tr>
                        <th scope="row"><a href="#">#ALE_2624</a></th>
                        <td>Merceds Ship</td>
                        <td><a href="#" className="text-secondary">Acessórios mercedes</a></td>
                        <td>$111.465</td>
                        <td><span className="badge bg-secondary">Ag. retirada</span></td>
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


      </div>
            </section>

{/* LINKS */}

{/* FOOTER */}

<Footer />
            
        </main>
    )
}