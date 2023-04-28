
import styled, { keyframes } from 'styled-components';

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  
  to {
    transform: translateX(0);
  }
`;

const Container = styled.div`
  height: 30px;
  background-color: red;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  animation: ${slideInFromLeft} 1s ease;
`;

const Announcement = () => {
  return (
    <Container>
      Super Deal! Free Shipping on Orders Over $50
    </Container>
  );
};

export default Announcement;



