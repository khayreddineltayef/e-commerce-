
  import styled from "styled-components";
  import { mobile } from "../responsive";
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle, AiOutlineHome, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { Link } from "react-router-dom";
  const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column" })}
  `;
  
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `;
  
  const Logo = styled.h1``;
  
  const Desc = styled.p`
    margin: 20px 0px;
  `;
  
  const SocialContainer = styled.div`
    display: flex;
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;
  
  const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}
  `;
  
  const Title = styled.h3`
    margin-bottom: 30px;
  `;
  
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    // flex-wrap: wrap;
    flex-direction: column
  `;
  
  const ListItem = styled.li`
    margin-bottom: 3px;
  `;
  
  const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ backgroundColor: "#fff8f8" })}
  
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;
  
  const Payment = styled.img`
      width: 50%;
  `;
  
  const Footer = () => {
    return (
      <Container>
        <Left>
          <Logo><span style={{color:"red"}}>KhayriShop</span></Logo>
          <Desc>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don’t look even slightly believable.
          </Desc>
          <SocialContainer>
        <SocialIcon color="3B5999">
              <AiFillFacebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <AiFillInstagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <AiFillTwitterCircle />
            </SocialIcon>
          
          </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List style={{display:"flex",flexDirection:"column"}}>
           <Link style={{textDecoration:"none"}} to="/"> <ListItem >Home</ListItem></Link>
           <Link style={{textDecoration:"none"}} to="/Card"> <ListItem  >Card</ListItem></Link>
           <Link style={{textDecoration:"none"}} to="/products/man"> <ListItem  >Man Fashion</ListItem></Link>
           <Link style={{textDecoration:"none"}} to="/products/women"> <ListItem  > Woman Fashion</ListItem></Link>
           <Link style={{textDecoration:"none"}}to="/products/kids"> <ListItem > Kids Fashion</ListItem></Link>
           <Link style={{textDecoration:"none"}}to="/products/bebe"> <ListItem  > Bebe Fashion</ListItem></Link>
           <Link  style={{textDecoration:"none"}} to="/profile"> <ListItem >My account</ListItem></Link>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <AiOutlineHome style={{marginRight:"10px"}}/> 3213,Tataouine,Tunisie
          </ContactItem>
          <ContactItem>
            <AiOutlinePhone style={{marginRight:"10px"}}/> +21628873231 
          </ContactItem>
          <ContactItem>
            <AiOutlineMail style={{marginRight:"10px"}} /> khayrishop@outlook.com
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    );
  };
  
  export default Footer;