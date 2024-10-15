import styled from 'styled-components';

const RoleDice = ({currentDice, roleDice}) => {

   

  return (
    <DiceCounter>
      <div className='dice'  onClick={roleDice}>
        <img src={`/images/dice_${currentDice}.png`} alt="dice 1" />
      </div>
      <p>Click on dice roll</p>
    </DiceCounter>
  );
};

export default RoleDice;

const DiceCounter = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-top: 48px;

    .dice {
        cursor: pointer;
    }
    p{
        font-size: 24px;
    }
`;
