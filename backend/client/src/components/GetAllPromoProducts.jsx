import { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";
import ProductCard from "./ProductCard";
import ProfileNav from "./ProfileNav";
import { Navbar } from "react-bootstrap";
import Announcement from "./Announcement";
import { useSelector } from "react-redux";
import Newsletter from "./Newsletter";
import Footer from "./Footer";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const GetAllPromoProducts = ( ) => {
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          
             "http://localhost:5000/product/products/promo"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, []);

  const isAuth=useSelector((state)=>state.reducer.isAuth)
 
  

  return (
    <>
    {isAuth?<ProfileNav />: <Navbar />}
    <Announcement />
    <h2 style={{color:"gray"}}>OUR PROMO PRODUCTS:</h2>
    <Container>
      { products.map((item) => <ProductCard item={item} key={item.id} />)
        }
    </Container>
    <Newsletter />
    <Footer />
    </>
  );
};

export default GetAllPromoProducts;