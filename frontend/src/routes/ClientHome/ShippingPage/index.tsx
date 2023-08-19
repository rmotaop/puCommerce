import "./styles.css";
// import styled from 'styled-components'
// import { Calalog } from '../components'
import shopLogo from "../../../assets/img/puCommerce.svg";
import Catalog from "../Catalog";
import HeaderClient from "../../../components/HeaderClient";
import Footer from "../../../components/Footer";

const ShippingPage = () => {
  return (
    <>
      <div className="section">
        <HeaderClient />
        <div className="row">
          <div className="column">
            <img src={shopLogo} className="mainShip" alt="mainShip" />
          </div>
          <div className="column">
            <h2>Envio gratis!!!</h2>
            <p>
              Atualmente, oferecemos frete grátis para qualquer lugar do Brasil.
            </p>
            <p>
              Você também receberá um brinde nosso nas compras acima de R$1.500
              fique conosco.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShippingPage;
