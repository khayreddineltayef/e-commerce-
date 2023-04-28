// import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

import Home from "./pages/Home";
import ProductsForHome from "./components/ProductsForHome";
import Product from "./pages/Product";
import AllProducts from "./pages/AllProducts";
import Cart from "./pages/Cart";
import ShoppingCart from "./pages/ShoppingCart";
import Dashboard from "./components/Dashbord";
import UpdatePassword from "./components/UpdatePassword";
import Carts from "./components/Carts";
import AddressForm from "./components/AdressForm";
import Success from "./pages/Success";
import GetAllPromoProducts from "./components/GetAllPromoProducts";
import Orders from "./components/Orders";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sucess" element={<Success />} />

        <Route path="/order" element={<AddressForm />} />
        <Route path="/carts" element={<Carts />} />
        <Route path="/orders" element={<Orders />} />

        <Route path="/updatePassword" element={<UpdatePassword />} />

        <Route path="/products" element={<AllProducts />} />

        <Route path="/Card" element={<ShoppingCart />} />

        <Route path="/products/:category" element={<Product />} />
        <Route path="/productshome" element={<ProductsForHome />} />
        <Route path="/product/:id" element={<Cart />} />

        <Route path="/login" element={<Login />} />
        <Route path="/promo" element={<GetAllPromoProducts />} />

        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
