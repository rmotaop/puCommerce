import homeIcon from '../../assets/img/home.svg';
import stockIcon from '../../assets/img/stock.svg';
import clientes from '../../assets/img/usuarios.svg';
import LoggedUser from "../LoggedUser";
import {Link, NavLink} from "react-router-dom";

export default function HeaderGestor() {
    return (
        <header className="dsc-header-gestor">
            <nav className="dsc-container">
                <Link to="/catalog">
                    <h1>puCommerce - Gestor</h1>
                </Link>
                <div className="dsc-navbar-right">
                    <div className="dsc-menu-items-container">
                        <NavLink to="/catalog" className={({isActive}) => isActive ? "dsc-menu-item-active" : ""}>
                            <div className="dsc-menu-item">
                                <img src={homeIcon} alt="Início"/>
                                <p>Catálogo</p>
                            </div>
                        </NavLink>
                        <NavLink to="/gestor/products"  className={({isActive}) => isActive ? "dsc-menu-item-active" : ""}>
                            <div className="dsc-menu-item">
                                <img src={stockIcon} alt="Cadastro de produtos"/>
                                <p>Produtos da Loja</p>
                            </div>
                        </NavLink>
                        <NavLink to="/gestor/clients"  className={({isActive}) => isActive ? "dsc-menu-item-active" : ""}>
                            <div className="dsc-menu-item">
                                <img src={clientes} alt="Clientes"/>
                                <p>Clientes loja</p>
                            </div>
                        </NavLink>
                    </div>
                    <LoggedUser/>
                </div>
            </nav>
        </header>
    )
}