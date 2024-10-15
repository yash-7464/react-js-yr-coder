import styled from "styled-components";
import StartGame from "./componets/StartGame";
import { useState } from "react";
import GamePlay from "./componets/GamePlay";



function App() {
  
  const [isGameStarted, setIsGameStarted] = useState(true);

  const togglePlay = () => {
    setIsGameStarted((prev) => !prev);
  }
 
  return (
    <>
      {isGameStarted ? <GamePlay /> : <StartGame toggle = {togglePlay}/>}
    </>
  )
}

export default App
