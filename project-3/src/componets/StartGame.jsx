import styled from 'styled-components';
import { Button } from '../styled/Button';

const StartGame = ({toggle}) => {
  return (
    <Container>
      <div>
        <img src="/images/dices.png" alt="" />
      </div>
      <div  className='content'>
        <h1>DICE GAME</h1>
        <Button>Paly Game </Button>
      </div>
    </Container>
  );
};

export default StartGame;

const Container = styled.div`
    max-width:1180px;
    margin:0 auto;
    height:100vh;
    display:flex;
    align-items: center;
.content{ 
    h1{
        font-size:96px;
        white-space:nowrap;
    }
}
`;


