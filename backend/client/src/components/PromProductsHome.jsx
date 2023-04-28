import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styled from "styled-components";
const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function ProProductsHome() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchNewProducts() {
      try {
        const response = await axios.get("/product/promo");

        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchNewProducts();
    // console.log(products);
  }, [products]);

  return (
    <Container>

      {products.map((item) => (
        <ProductCard item={item} key={item._id} />
      ))}
    </Container>
  );
}

export default ProProductsHome;
