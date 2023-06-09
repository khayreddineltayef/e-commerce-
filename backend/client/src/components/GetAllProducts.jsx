import { useEffect, useState } from "react";
import styled from "styled-components";

import axios from "axios";
import ProductCard from "./ProductCard";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const GetAllProducts = ( ) => {
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          
             "http://localhost:5000/product/getAll"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, []);

  

  return (
    <Container>
      { products.map((item) => <ProductCard item={item} key={item.id} />)
        }
    </Container>
  );
};

export default GetAllProducts;