import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

function MyApp(){
  return (
    <div>
      <h1>hello yash </h1>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
)
