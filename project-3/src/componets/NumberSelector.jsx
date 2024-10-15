import {useState} from 'react';
import styled from 'styled-components';

const NumberSelector = ({error, setError, selected, setSelected}) => {
  const arrayNum = [1, 2, 3, 4, 5, 6];

  const numberSelectorHandler = (value) => {
    setSelected (value);
    setError("");
  }

  return (
    <NumberSelectContainor>
      <p className="error">{error}</p>
      <div className="flex">

        {arrayNum.map ((value, i) => (
          <Box
            isSelected={value === selected}
            key={i}
            onClick={() => numberSelectorHandler(value)}
          >
            {value}
          </Box>
        ))}
      </div>
      <p>select number</p>
    </NumberSelectContainor>
  );
};

export default NumberSelector;

const NumberSelectContainor = styled.div`
display: flex;
flex-direction: column;
align-items: end;
.flex{
    display: flex;
    gap:24px;
}
p{
    font-size: 24px;
    font-weight: 700;
}
.error{
    color: red;
}
`;

const Box = styled.div`
    height: 72px;
    width: 72px;
    border: 1px solid black;
    display:grid;
    place-items: center;
    font-size: 24px;
    font-weight: 700;
    background: ${props => (props.isSelected ? 'black' : 'white')};
    color: ${props => (!props.isSelected ? 'black' : 'white')};
`;
