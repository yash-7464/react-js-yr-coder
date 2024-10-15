import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {


  const handleLogout = () => {
      // localStorage.removeItem('isCheckedIn');
      // localStorage.removeItem('checkInDate');
      // localStorage.removeItem('checkInTime');
      // localStorage.removeItem('breakTime');
      // localStorage.removeItem('isOnBreak');
      // Add any other relevant items to remove here
      localStorage.clear();
      // setIsLoggedIn(false);

    window.location.href = "/login";
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light heder-navbar  fixed-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">React App</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul
              className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
              style={{"--bs-scroll-height": "100px;"}}>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/holidays">Holidays</NavLink>
              </li>
            
            </ul>
            <p className='text-center m-2 fw-bold'>Welcome {localStorage.getItem("username")}</p>
            <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
