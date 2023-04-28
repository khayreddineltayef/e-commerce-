import {  useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";

import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeAllFromCart, removeFromCart } from "../redux/actions";
import ProfileNav from "../components/ProfileNav";

import {GiShoppingCart } from "react-icons/gi"
import { ToastContainer, toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { useEffect } from "react";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button2 = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

 const  ShoppingCart = () => {
  const Cart = useSelector((state) => state.cartReducer.products);
const dispatch=useDispatch()
const isAuth = useSelector((state) => state.reducer.isAuth);
const user=useSelector((state) => state.reducer.users);
const Navigate=useNavigate()
////
const total = useSelector((state) => state.totalReducer.total);

useEffect(() => {
  const newTotal = Cart.reduce((acc, curr) => acc + curr[0].price * curr[0].quantity, 0);
  dispatch({ type: 'UPDATE_TOTAL', payload: newTotal });
}, [Cart, dispatch]);







/////

  const handleCheckout = () => {
    const userId = user._id; 
    const cartItems = Cart.map((item) => ({
      productId: item[0]._id,
      quantity: item[0].quantity

    }));
   
 
    dispatch(addToCart(userId, cartItems))

    Navigate("/order")

  };
const totalQuantity = Cart.reduce(
  (acc, curr) => acc + curr[0].quantity,
  0
);
const handleRemoveProduct = (productId) => {
  dispatch(removeFromCart(productId));
  toast.error("you just delete this article ")
}
const handleRemoveAll = () => {
  dispatch(removeAllFromCart());
}
if (Cart.length === 0) {
  return (
    <Container>
     {isAuth?<ProfileNav />:<Navbar />}
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG is Empty</Title>
              <span style={{height:"150px",backgroundColor:"red", width:"150px",marginLeft:"650px",marginBottom:"15px",marginTop:"15px"}}><GiShoppingCart style={{height:"450px", width:"450px"}} /></span>
        <p style={{marginLeft:"650px"}}>No products in your shopping cart</p>
       <Link to="/products" > <Button style={{width:"150px",height:"70px", marginLeft:"650px",marginTop:"200px"}}>CONTINUE SHOPPING</Button>
     
       </Link>
      </Wrapper>
      <Footer />
    </Container>
  );
}

  
  return (
    <Container>
     {isAuth?<ProfileNav />:<Navbar />} 
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to="/products" ><TopButton>CONTINUE SHOPPING</TopButton></Link>
          <TopTexts>
            <TopText>Shopping Bag({totalQuantity})</TopText>
          </TopTexts>
          {isAuth?<Button onClick={handleCheckout} >CHECKOUT NOW</Button>:
<Button disabled>CHECKOUT NOW</Button>}
        </Top>
        <Bottom>
           <Info>
            {Cart.map((product) => (
              <Product >
                <ProductDetail>
                  <Image src={product[0].img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> 
                      {product[0].title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> 
                      {product[0]._id}
                    </ProductId>
                    <ProductColor color={product[0].color} />
                    <ProductSize>
                      <b>Size:</b> 
                      {product[0].size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <ProductAmount> <span style={{color:"green",fontSize:"20px"}}>Nombre des Articles: {product[0].quantity}</span></ProductAmount>
                  </ProductAmountContainer>
                  <ProductPrice>
                   <span style={{color:"red",fontSize:"20px"}}>  Price: ${product[0].price * product[0].quantity}</span> 
                  </ProductPrice>
                </PriceDetail>
               <span  onClick={() => handleRemoveProduct(product[0]._id)} style={{height:"40px",cursor:"pointer", width:"40px",marginTop:"100px"}}><DeleteIcon /></span>
              </Product>
            ))}
            <Hr />
          </Info> 
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
            
              
              <SummaryItemPrice>$ {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {total}</SummaryItemPrice>

            </SummaryItem>
            
          </Summary>
        </Bottom>
      </Wrapper>
      <Button2 onClick={handleRemoveAll}>Remove ALL</Button2>
      <Footer />
      <ToastContainer />
    </Container>
    
  );
};
export default ShoppingCart;