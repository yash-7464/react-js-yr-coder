import TotalScore from './TotalScore';
import NumberSelector from './NumberSelector';
import styled from 'styled-components';
import RoleDice from './RoleDice';
import {useState} from 'react';
import {Button, OutlineBtn} from '../styled/Button';
import ShowRules from './ShowRules';

const GamePlay = () => {
  const [score, setScore] = useState (0);
  const [currentDice, setCurrentDice] = useState (1);
  const [selected, setSelected] = useState ();
  const [error, setError] = useState ('');
  const [showRules, setShowRules] = useState(false);

  const generateRandomNumber = (min, max) => {
    return Math.floor (Math.random () * (max - min) + min);
  };

  const roleDice = () => {
    if (!selected) {
      setError ('You have not selected any number');
      return;
    }
    setError ('');

    const randomNumber = generateRandomNumber (1, 7);
    setCurrentDice (prev => randomNumber);

    if (selected === randomNumber) {
      setScore (prev => prev + randomNumber);
    } else {
      setScore (prev => prev - 2);
    }
    setSelected (undefined);
  };

  const resetScore = () => {
    setScore(0);
  }

  return (
    <MainContainer>

      <div className="top_section">
        <TotalScore score={score} />
        <NumberSelector
          error={error}
          setError={setError}
          selected={selected}
          setSelected={setSelected}
        />
      </div>

      <RoleDice currentDice={currentDice} roleDice={roleDice} />

      <div className='btns'>
        <OutlineBtn onClick={resetScore}>Reset</OutlineBtn>
        <Button onClick={() => setShowRules(prev => !prev)}>
            {showRules ? "Hide" : "Show"}
             Rules</Button>
      </div>

     {showRules && <ShowRules />}
    </MainContainer>
  );
};

export default GamePlay;

const MainContainer = styled.main`
padding-top: 70px;
    .top_section{
        display: flex;
        justify-content: space-around;
        align-items: end;
    }
    .btns{
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
`;
