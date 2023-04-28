
import styled, { keyframes } from 'styled-components';

const slideInFromLeft = keyframes`
  from {
    transform: translateX(0);
  }
  
  to {
    transform: translateX(-100%);
  }
`;

const Container = styled.div`
  height: 30px;
  background-color: violet;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  animation: ${slideInFromLeft} 1s ease;
`;

const NewProductAnnouncement = () => {
  return (
    <Container>
     Discover Our new Products
    </Container>
  );
};

export default NewProductAnnouncement;



