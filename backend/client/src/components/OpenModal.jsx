import styled, { css } from "styled-components";
import { mobile } from "../responsive";


const Container = styled.div`
`;

const Wrapper = styled.div`
  // padding: 50px;
  padding: 10px;

  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  height: 200px;
width:200px
border-raduis:50%
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 30px;
  ${mobile({ padding: "10px" })}
`;



const Desc = styled.p`
  margin: 10px 0px;
`;




const FilterSize = styled.select`
  padding: 10px;
  margin-bottom: 10px;
`;

const FilterSizeOption = styled.option``;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 10px;
`;

const FilterStatus = styled.div`
  color: ${props => props.inStock ? "green" : "red"};
`;

const OpenModal = ({item}) => {
  const calculateDiscountPrice = (price, discount) => {
    const discountAmount = (item.price * item.promoCode) / 100;
    


    return (price - discountAmount).toFixed(0);
  }

  let priceDisplay = item.price;
  if (item.promoCode) {
    priceDisplay = calculateDiscountPrice(item.price, item.promoCode);
  }

  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={item.img} />
        </ImgContainer>
        <InfoContainer>
          <Desc>{item.desc}</Desc>
          <Price>
            {item.promoCode
              ? <>
                  <del style={{color:"red"}}>${item.price}</del> <span style={{color:"gray",marginRight:"5px"}}>${priceDisplay}</span>
                </>
              : `$ ${item.price}`
            }
          </Price>
          <div>
            <div style={{display:"flex"}} >
              <h6>Color:</h6>
              <div style={{display:"flex",marginLeft:"5px"}}>
              {item.color?.map((c) => (
                <FilterColor
                  color={c}
                  key={c}
                />
              ))}
              </div>
            </div>
            <div style={{display:"flex"}}>
              <h6 style={{marginRight:"7px"}}>Size:</h6>
              <FilterSize>
                {item.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </div>
            <div>
              <FilterStatus inStock={item.inStock}>
                {item.inStock ? "In Stock" : "Out of Stock"}
              </FilterStatus>
            </div>
          
          </div>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};


const Price = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
  ${props => props.discount && css`
    color: green;
  `}
`;



export default OpenModal;

