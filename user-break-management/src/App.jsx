import './App.css'
import { Routes, Route} from 'react-router-dom';
import Login from './componets/Login';
import Registration from './componets/Registration';
import Home from './componets/Home';
function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Registration />}></Route>
        <Route path='/home' element={<Home />}></Route>
        
      </Routes>
    </>
  )
}

export default App
