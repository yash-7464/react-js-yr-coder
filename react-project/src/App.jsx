import './App.css';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import Header from './componets/Header';
import Dashboard from './componets/Dashboard';
import Footer from './componets/Footer';
import Register from './componets/Register';
import Login from './componets/Login';
import Holidays from './componets/holidays/Holidays';
import HolidaysForm from './componets/holidays/HolidaysForm';
import {useEffect} from 'react';

function App () {
  const location = useLocation ();
  const navigate = useNavigate ();
  const isAuthPage =
    location.pathname === '/register' || location.pathname === '/login';

  useEffect (
    () => {
      // Check for user authentication and redirect appropriately
      const userId = localStorage.getItem ('userId');

      if (
        !userId &&
        location.pathname !== '/login' &&
        location.pathname !== '/register'
      ) {
        navigate ('/login');
      }
      if (
        userId &&
        (location.pathname === '/login' || location.pathname === '/register')
      ) {
        navigate ('/');
      }
    },
    [location.pathname, navigate]
  );

  return (
    <>
      {!isAuthPage && <Header />}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/" element={<Dashboard />} />
        <Route path="/holidays" element={<Holidays />} />
        <Route path="/holidayForm" element={<HolidaysForm />} />

      </Routes>
      {!isAuthPage && <Footer />}

    </>
  );
}

export default App;
