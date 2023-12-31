import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Catalog from "./routes/ClientHome/Catalog";
import ClientHome from "./routes/ClientHome";
import ProductDetails from "./routes/ClientHome/ProductDetails";
import Cart from "./routes/ClientHome/Cart";
import {useEffect, useState} from "react";
import { ContextCartCount } from "./utils/context-cart";
import Login from "./routes/ClientHome/Login";
import Signup from "./routes/ClientHome/Signup";
import Admin from "./routes/Admin";
import Gestor from "./routes/Gestor";
import AdminHome from "./routes/Admin/AdminHome";
import GestorHome from "./routes/Gestor/GestorHome";
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './utils/history';
import { PrivateRoute } from "./components/PrivateRoute";
import {AccessTokenPayload} from "./types/auth";
import {ContextToken} from "./utils/context-token";
import * as authService from './services/auth-service';
import * as cartService from './services/cart-service';
import Confirmation from "./routes/ClientHome/Confirmation";
import ProductListing from "./routes/Admin/ProductListing";
import ProductForm from "./routes/Admin/ProductForm";
import ClientListing from "./routes/Gestor/ClientListing";
import ClientForm from "./routes/Gestor/ClientForm";
import StoreForm from "./routes/Admin/StoreForm";
import StoreListing from "./routes/Admin/StoreListing";
import StoreHome from "./routes/Admin/StoreHome";
import UserListing from "./routes/Admin/UserListing";
import UserForm from "./routes/Admin/UserForm";
import UserHome from "./routes/Admin/UserHome";

import OrderListing from "./routes/ClientHome/OrderListing";
import OrderForm from "./routes/ClientHome/OrderForm";
import PucHome from "./routes/Home";
import ShippingPage from "./routes/ClientHome/ShippingPage";


export default function App() {

    const [contextCartCount, setContextCartCount] = useState<number>(0);

    const [contextTokenPayload, setContextTokenPayload] = useState<AccessTokenPayload>();

    useEffect(() => {
        setContextCartCount(cartService.getCart().items.length);

        if(authService.isAuthenticated()) {
            const payload = authService.getAccessTokenPayload();
        }
    }, []);

    return (
        <ContextToken.Provider value={{ contextTokenPayload, setContextTokenPayload }}>
            <ContextCartCount.Provider value={{ contextCartCount, setContextCartCount }}>
                <HistoryRouter history={history}>
                    <Routes>


                        <Route path="/" >
                            <Route path="home" element={<PucHome />} />
                            <Route path="shipping" element={<ShippingPage />} />
                            <Route path="login" element={<Login />} />
                            <Route path="Signup" element={<Signup />} />
                        </Route>

                        <Route path="/" element={<ClientHome />}>
                            <Route index element={<Catalog />} />
                            <Route path="catalog" element={<Catalog />} />
                            <Route path="product-details/:productId" element={<ProductDetails />} />
                            <Route path="cart" element={<Cart />}/>
                            <Route path="order" element={<OrderListing />}/>
                            <Route path="order/:orderId" element={<OrderForm />}/>
                            <Route path="confirmation/:orderId" element={<PrivateRoute><Confirmation/></PrivateRoute>}/>
                        </Route>
                        <Route path="/admin/" element={<PrivateRoute roles={['ROLE_ADMIN']}><Admin/></PrivateRoute>}>
                            <Route index element={<Navigate to="/admin/home"/>} />
                            <Route path="home" element={<AdminHome />} />
                            <Route path="products" element={<ProductListing />}/>
                            <Route path="products/:productId" element={<ProductForm />}/>
                        </Route>
                        <Route path="/admin/" element={<PrivateRoute roles={['ROLE_ADMIN']}><Admin/></PrivateRoute>}>
                            <Route index element={<Navigate to="/admin/store"/>} />
                            <Route path="store" element={<StoreHome />} />
                            <Route path="stores" element={<StoreListing />}/>
                            <Route path="stores/:storeId" element={<StoreForm />}/>
                        </Route>
                        <Route path="/admin/" element={<PrivateRoute roles={['ROLE_ADMIN']}><Admin/></PrivateRoute>}>
                            <Route index element={<Navigate to="/admin/user"/>} />
                            <Route path="user" element={<UserHome />} />
                            <Route path="users" element={<UserListing />}/>
                            <Route path="users/:userId" element={<UserForm />}/>
                        </Route>

                        <Route path="/gestor/" element={<PrivateRoute roles={['ROLE_GESTOR']}><Gestor/></PrivateRoute>}>
                            <Route index element={<Navigate to="/gestor/home"/>} />
                            <Route path="home" element={<GestorHome />} />
                            <Route path="products" element={<ProductListing />}/>
                            <Route path="products/:productId" element={<ProductForm />}/>
                        </Route>
                        <Route path="/gestor/" element={<PrivateRoute roles={['ROLE_GESTOR']}><Gestor/></PrivateRoute>}>
                            <Route index element={<Navigate to="/gestor/client"/>} />
                            <Route path="clients" element={<ClientListing />}/>
                            <Route path="clients/:clientId" element={<ClientForm />}/>
                        </Route>
                      
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </HistoryRouter>
            </ContextCartCount.Provider>
        </ContextToken.Provider>
    );
}
