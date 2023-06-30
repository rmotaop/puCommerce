import './styles.css';
import {Link} from 'react-router-dom';
import CartIcon from "../CartIcon";
import iconAdmin from '../../assets/img/admin.svg';
import * as authService from '../../services/auth-service'
import {useContext} from "react";
import {ContextToken} from "../../utils/context-token";
import LoggedUser from "../LoggedUser";

export default function HeaderClient() {

    const { contextTokenPayload } = useContext(ContextToken);


    return (
        <header className="dsc-header-client">
            <nav className="dsc-container">
                <Link to="/">
                    <h1>puCommerce</h1>
                </Link>
                <div className="dsc-navbar-right">
                    <div className="dsc-menu-items-container">
                        {
                            contextTokenPayload &&
                            authService.hasAnyRoles(['ROLE_ADMIN']) &&
                            <Link to="/admin">
                                <div className="dsc-menu-item">
                                    <img src={iconAdmin}/>
                                    <span className="span">Admin</span>
                                </div>
                            </Link>
                        }
                        <Link to="/cart">
                            <div className="dsc-menu-item">
                                <CartIcon/>
                                <span className="span">Carrinho</span>
                            </div>
                        </Link>
                    </div>
                    <div className="logUser">
                       <LoggedUser/>
                    </div>
                </div>
            </nav>
        </header>
    );
}
