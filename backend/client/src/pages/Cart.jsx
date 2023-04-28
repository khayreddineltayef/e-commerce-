import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import axios from "axios";
import { addToCart2 } from "../redux/actions";
import ProfileNav from "../components/ProfileNav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  &.selected {
    border: 2px solid blue;
  }
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;


const Cart = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const isAuth=useSelector((state)=>state.reducer.isAuth)

  const dispatch = useDispatch();
 const  navigate=useNavigate()

  
useEffect(() => {
  const getProduct = async () => {
    try {
      const res = await axios.get("/product/find/" + id);
      setProduct(res.data);
      setSelectedSizes(res.data.size ? [res.data.size[0]] : []);
      setSelectedColors(res.data.color ? [res.data.color[0]] : []);
    } catch {}
  };
  getProduct();
}, [id]);

const handleQuantity = (type) => {
  if (type === "dec") {
    quantity > 1 && setQuantity(quantity - 1);
  } else {
    setQuantity(quantity + 1);
  }
};

const handleClick = () => {
  if (product.inStock === false) {
   
    toast.error('Sorry, this product is out of stock.', {
      position: "top-center",
      autoClose: 3000, // Set the duration for how long the toast message should be displayed
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  
    return ;
  }
  
  let selectedColor = selectedColors.length > 0 ? selectedColors[0] : product.color[0];
  let selectedSize = selectedSizes.length > 0 ? selectedSizes[0] : product.size[0];
  const price = product.price;
  const items = [];
  selectedColors.forEach((color) => {
    selectedSizes.forEach((size) => {
      items.push({
        ...product,
        quantity,
        color:selectedColor,
        size:selectedSize,
        price,
        total: product.price * quantity,
      });
    });
  });
  dispatch(addToCart2(items));
  navigate("/Card");
};


    // Send a POST request to create a new cart
    

  return (
    <Container>

     {isAuth?<ProfileNav />:<Navbar />}  
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor
                  className={selectedColors.includes(c) ? "selected" : ""}
                  color={c}
                  key={c}
                  onClick={() =>
                    setSelectedColors((prev) =>
                      prev.includes(c)
                        ? prev.filter((color) => color !== c)
                        : [...prev, c]
                    )
                  }
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize  value={selectedSizes[0]} onChange={(e) => setSelectedSizes([e.target.value])} >
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <IoMdRemove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <IoMdAdd onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>

          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
      <ToastContainer />

    </Container>
  );
};

export default Cart;

