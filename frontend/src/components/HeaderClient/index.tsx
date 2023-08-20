import "./styles.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartIcon from "../CartIcon";
import iconAdmin from "../../assets/img/admin.svg";
import envio from "../../assets/img/deliveryTruck.svg";
import stock from "../../assets/img/product.svg";
import people from "../../assets/img/gestor.svg";
import * as authService from "../../services/auth-service";
import { ContextToken } from "../../utils/context-token";
import LoggedUser from "../LoggedUser";

export default function HeaderClient() {
  const { contextTokenPayload } = useContext(ContextToken);
  return (
    <header className="dsc-header-client">
      <nav className="dsc-container">
        <span>
          <Link to="/Home">
            <h1>puCommerce</h1>
          </Link>
        </span>
        <span>
          <Link to="/Shipping">
            <div className="dsc-menu-item">
              <img className="img1" src={envio} />
              <span className="span">Forma de Envio</span>
            </div>
          </Link>
        </span>
        <span>
          <Link to="/Catalog">
            <div className="dsc-menu-item">
              <img className="img" src={stock} />
              <span className="span">Produtos</span>
            </div>
          </Link>
        </span>

        <div className="dsc-navbar-right">
          <div className="dsc-menu-items-container">
            {(contextTokenPayload &&
              authService.hasAnyRoles(["ROLE_ADMIN"]) && (
                <Link to="/admin">
                  <div className="dsc-menu-item">
                    <img className="img" src={iconAdmin} />
                    <span className="span">Administrador</span>
                  </div>
                </Link>
              )) ||
              (contextTokenPayload &&
                authService.hasAnyRoles(["ROLE_GESTOR"]) && (
                  <Link to="/gestor">
                    <div className="dsc-menu-item">
                      <img className="img" src={people} />
                      <span className="span">Gestor</span>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
        <span>
          <Link to="/cart">
            <div className="dsc-menu-item">
              <CartIcon />
              <span className="span1">Carrinho</span>
            </div>
          </Link>
        </span>
          <div className="logUser">
            <LoggedUser />
          </div>
      </nav>
    </header>
  );
}
