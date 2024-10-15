import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './componets/Card'

function App() {
  const [count, setCount] = useState(0)
  let myObj = {
    name:"yash",
    age:23
  } 
  let newArr = [1,2,3]

  return (
    <>
      <h1 className="text-3xl font-bold underline bg-green-500 rounded-xl mb-5">Tailwind test</h1>
      <Card userName = "react" btnText="click me"/>
      <Card userName = "hello" />
    </>
  )
}

export default App
