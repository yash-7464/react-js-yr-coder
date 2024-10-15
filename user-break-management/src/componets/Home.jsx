// import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';


const Home = () => {
    // const [sessionData, setSessionData] = useState(null);
    const [cookies, , removeCookie] = useCookies(['user']);
    const navigate = useNavigate(); 

    // useEffect(() => {
    //     // const userId = localStorage.getItem('userId');
    //     // const username = localStorage.getItem('username');
    //     if (userId && username) {
    //         setSessionData({ id: userId, username: username });
    //     } else {
    //         navigate("/");
    //     }
    // }, [navigate]);

    const handleLogout = () => {
        // Clear localStorage and reset session data
        // localStorage.removeItem('userId');
        // localStorage.removeItem('username');
        // setSessionData(null); 
        removeCookie('userId', { path: '/' });
        removeCookie('username', { path: '/' });
        navigate('/');
       
    };

    return (
        <div>
            <h5>Home Page</h5>
            {cookies.userId && cookies.username ? (
                <div>
                    <h1>Welcome, {cookies.username}! Your ID is {cookies.userId}.</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
            {/* {sessionData ? (
                <div>
                    <h1>Welcome, {sessionData.username}! Your ID is {sessionData.username}.</h1>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <h1>Loading...</h1>
            )} */}
        </div>
    );
};

export default Home;
