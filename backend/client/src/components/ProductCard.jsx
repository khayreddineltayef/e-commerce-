import { useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { TOGGLE_LIKE_PRODUCT } from "../redux/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import OpenModal from "./OpenModal";
import { Modal } from "react-bootstrap";


const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  

  &:hover ${Info} {
    opacity: 1;
  }
`;

// const ProductName = styled.div`
//   width: 100%;
//   text-align: center;
//   position: absolute;
//   bottom: 0;
//   background-color: white;
//   z-index: 2;
//   border:solid 2px black
// `;

const Circle = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  top: -10px;
  right: -15px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;
// const Stock = styled.div`
// width: 100%;
// text-align: center;
// font-weight: bold;
// margin-top: 5px;
// `;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  color: ${props => props.isLiked ? "red" : "black"};

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const likedProducts = useSelector((state) => state.productReducer.likedProducts);
const isAuth=useSelector((state)=>state.reducer.isAuth)
  const isLiked = likedProducts.includes(item._id);

  const toggleLike = () => {
    if (isLiked) {
      dispatch({ type: TOGGLE_LIKE_PRODUCT, payload: item._id });
      toast.error(`You just Unliked ${item.title}this article.`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch({ type: TOGGLE_LIKE_PRODUCT, payload: item._id });
      toast.success(`You just Liked ${item.title} this article`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  
 

  return (
    <Container>
      
      {item.promoCode && <Circle>-{item.promoCode}%</Circle>}
      <Image src={item.img} />
      <Info>
        {/* <Icon>
          <Link to={`/product/${item._id}`}>
            <AiOutlineShoppingCart />
          </Link>
        </Icon> */}
        {isAuth?<Icon>
          <Link to={`/product/${item._id}`}>
            <AiOutlineShoppingCart />
          </Link>
        </Icon>:(<Icon> <AiOutlineShoppingCart /></Icon>)}
        {/* <Icon isLiked={isLiked} onClick={toggleLike}>

          {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
        </Icon> */}
        {isAuth?<Icon isLiked={isLiked} onClick={toggleLike}>

{isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
</Icon>:(<Icon><AiOutlineHeart /></Icon>)}
        <Icon>
         
             <span onClick={handleShow}>
     <AiOutlineSearch />
      </span>

      <Modal  show={show} onHide={handleClose}  animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{item.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{width:"500px"}}>
        <OpenModal item={item} />
        </Modal.Body>
      
      </Modal>
     
     
     </Icon>
      </Info>
     
      
      <ToastContainer />
  
    </Container>
  );
};

export default ProductCard;
