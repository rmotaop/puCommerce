import './styles.css';
import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import ProductDetailsCard from "../../../components/ProductDetailsCard";
import { Product } from '../../../types/product';
import * as productService from '../../../services/product-service';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import * as cartService from '../../../services/cart-service';
import {ContextCartCount} from "../../../utils/context-cart";
import {ContextToken} from "../../../utils/context-token";
import * as authService from '../../../services/auth-service';

export default function ProductDetails() {
  
  const navigate = useNavigate();
  
  const params = useParams();
  
  const {setContextCartCount} = useContext(ContextCartCount);
  
  const [product, setProduct] = useState<Product>();
  
  const {contextTokenPayload, setContextTokenPayload } = useContext(ContextToken);

  useEffect(() => {
    productService.findById(Number(params.productId))
      .then(response => {
        console.log(response.data);
        setProduct(response.data)
      })
      .catch(() => {
        navigate("/");
      })
  },[]);

  function handleBuyCLick() {
    if(product && contextTokenPayload && authService.isAuthenticated()) {
      cartService.addProduct(product);
      setContextCartCount(cartService.getCart().items.length)
      navigate("/cart")
    } else {
      navigate("/login")
    }

  }

  return (
      <main>
        <section id="product-details-section" className="dsc-container">
          {
            product && 
            <ProductDetailsCard product={product}/>
          }
          <div className="dsc-btn-page-container">
              <div onClick={handleBuyCLick}>
                <ButtonPrimary textButton="Comprar"/>
              </div>
            <Link to="/">
              <ButtonInverse textButton="Início"/>
            </Link>
          </div>
        </section>
      </main>
  );
}
