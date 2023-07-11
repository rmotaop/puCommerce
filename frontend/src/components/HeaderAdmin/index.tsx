import homeIcon from '../../assets/img/home.svg';
import stockIcon from '../../assets/img/stock.svg';
import usuarios from '../../assets/img/usuarios.svg';
import lojistas from '../../assets/img/lojistas.svg';
import LoggedUser from "../LoggedUser";
import {Link, NavLink} from "react-router-dom";
import './styles.css'

export default function HeaderAdmin() {
    return (
        <header className="dsc-header-admin">
            <nav className="dsc-container">
                <Link to="/catalog">
                    <h1>puCommerce - Admin</h1>
                
                </Link>
                <div className="dsc-navbar-right">
                    <div className="dsc-menu-items-container">
                        <NavLink to="/admin/home" className={({isActive}) => isActive ? "dsc-menu-item-active" : ""}>
                            <div className="dsc-menu-item">
                                <img src={homeIcon} alt="Início"/>
                                <p>Dashboard</p>
                            </div>
                        </NavLink>
                        <NavLink to="/admin/products"  className={({isActive}) => isActive ? "dsc-menu-item-active" : ""}>
                            <div className="dsc-menu-item">
                                <img src={stockIcon} alt="Produtos"/>
                                <p>Produtos</p>
                            </div>
                        </NavLink>
                        <NavLink to="/admin/stores"  className={({isActive}) => isActive ? "dsc-menu-item-active" : ""}>
                            <div className="dsc-menu-item">
                                <img src={lojistas} alt="Lojistas"/>
                                <p>Lojistas</p>
                            </div>
                        </NavLink>
                        <NavLink to="/admin/users"  className={({isActive}) => isActive ? "dsc-menu-item-active" : ""}>
                            <div className="dsc-menu-item">
                                <img src={usuarios} alt="Usuários"/>
                                <p>Usuários</p>
                            </div>
                        </NavLink>
                    </div>
                    <div className="logUser">
                       <LoggedUser/>
                    </div>
                </div>
            </nav>
        </header>
    )
}