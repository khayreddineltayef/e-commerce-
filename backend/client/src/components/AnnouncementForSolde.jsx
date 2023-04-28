
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
  background-color: violet;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  animation: ${slideInFromLeft} 1s ease;
`;

const AnnouncementForSolde = () => {
  return (
    <Container>
     Discover Our  Summer Soldes
    </Container>
  );
};

export default AnnouncementForSolde;



