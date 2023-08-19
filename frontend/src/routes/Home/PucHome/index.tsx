import "./styles.css";
import { Link } from "react-router-dom";
import MainImage from "../../../assets/img/puCommerce.svg";
import HeaderClient from "../../../components/HeaderClient";
import Footer from "../../../components/Footer";

const PucHome = () => {
  return (
    <>
      <div className="section">
        <HeaderClient />
        <div className="row">
          <div className="column">
            <h1 className="h1">
              Alta qualidade <br /> e produtos para todas as necessidades
            </h1>
            <p className="p">
              Produtos de qualidade importados do Japão, Europa e EUA e também
              nacionais <br /> dos melhores fornecedores.
            </p>

            <Link to="/catalog" className="btnProducts">
              Ver Produtos
            </Link>
          </div>
          <div className="column">
            <img className="main-img" src={MainImage} alt="MainImage" />
          </div>
        </div>
        <div className="newsletter">
          <h3>
            {" "}
            Mantenha-se informado sobre a chegada de novos produtos e ganhe
            desconto assinando nosso Boletim de Notícias.
          </h3>
          <form className="contact-form">
            <input
              type="email"
              className="inputType"
              placeholder="  informe o email"
            />
            <button type="submit" className="btnSubscrib">
              Increva-se
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PucHome;
