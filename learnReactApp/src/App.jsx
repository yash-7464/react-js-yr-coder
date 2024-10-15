import { useState } from "react"
import { Form, NestedObject } from "./form"
// import {TextFiled, CheckBox, Age} from "./textField.jsx";


function App() {
  const [count, setCount] = useState(0);

  function handleClick(){
    setCount(count+1);
  }
  return (
    <>
      <Form />
      <NestedObject />
      {/* <button onClick={handleClick} 
      className="bg-green-400 rounded-md max-w shadow-xl- m-2 text-white p-2">
          click me 
      </button>
      <p className="my-5">button click {count}</p> */}
      {/* <TextFiled />
      <CheckBox />
      <Age /> */}
    </>
  )
}

export default App
