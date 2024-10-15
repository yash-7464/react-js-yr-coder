import styled from "styled-components"


const ShowRules = () => {
  return (
    <RulesContainer>
      <h2>How to play dice game</h2>
      <div>
        <p>Select any number</p>
        <p>Click on dice image</p>
        <p>after click on  dice  if selected number is equal to dice number you will get same point as dice </p>
        <p>if you get wrong guess then  2 point will be dedcuted </p>
      </div>
    </RulesContainer>
  )
}

export default ShowRules

const RulesContainer = styled.div`
    background: #FBF1F1;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    margin-top: 40px;
    ;
`;