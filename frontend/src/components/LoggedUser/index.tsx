import * as authService from '../../services/auth-service';
import * as cartService from '../../services/cart-service';
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {ContextToken} from "../../utils/context-token";
import {ContextCartCount} from "../../utils/context-cart";
import './styles.css'

export default function LoggedUser() {

    const navigate = useNavigate();

    const {contextTokenPayload, setContextTokenPayload } = useContext(ContextToken);

    const [contextCartCount, setContextCartCount] = useState<number>(0);

    function handleLogoutClick() {
        authService.logout();
        setContextTokenPayload(undefined);
        setContextCartCount(contextCartCount)
        navigate("/Home");
    }
   
    return (
        
        contextTokenPayload && authService.isAuthenticated()
        ?
        (
            <div className="dsc-logged-user">
                    <p>Olá: {contextTokenPayload.user_name}
                        <span onClick={handleLogoutClick}>Sair</span>
                    </p>
                </div>
            )
            : (
                <Link to="/login">
                    Entrar
                </Link>
            )

    );
}