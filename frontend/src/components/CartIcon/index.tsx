import "./styles.css";
import cartIcon from "../../assets/img/cart.svg";
import { useContext, useEffect, useState } from "react";
import * as cartService from "../../services/cart-service";
import { ContextCartCount } from "../../utils/context-cart";

import { ContextToken } from "../../utils/context-token";
import * as authService from "../../services/auth-service";

export default function CartIcon() {
  const { contextCartCount } = useContext(ContextCartCount);
  const { contextTokenPayload, setContextTokenPayload } =
    useContext(ContextToken);

  return (
    <>
      {contextTokenPayload && authService.isAuthenticated() ? (
        <>
          <img src={cartIcon} alt="Carrinho de compras" />
          {contextCartCount > 0 && (
            <div className="dsc-cart-count">{contextCartCount}</div>
          )}
        </>
      ) : (
        <img src={cartIcon} alt="Carrinho de compras" />
      )}
    </>
  );
}
