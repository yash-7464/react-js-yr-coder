import { useState } from 'react'
import './App.css'

function App() {

  let [counter, setCounter] = useState(15)

  //let counter = 15

  const addValue = () => {
    if (counter < 20) {
      setCounter(counter=>counter+1)
      setCounter(counter=>counter+1)
      setCounter(counter=>counter+1)
      setCounter(counter=>counter+1)
      // return;
    }
    console.log(counter);
  }

  const removeValue = () => {

    if (counter > 0) {
      setCounter(counter => counter - 1)
    }
    console.log(counter);
  }

  return (
    <>
      <h1>Counter value: {counter}</h1>

      <button onClick={addValue}
      >Add Value</button>
      <br />
      <button onClick={removeValue}>Remove Value</button>

      <p>counter: {counter}</p>
    </>
  )
}

export default App
