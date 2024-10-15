import { useState } from 'react';
import { useNavigate, Link  } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value})

   
  }

  const submitForm = (e) => {
    e.preventDefault();

    const formData = {
      email: user.email,
      password: user.password,
    };

    axios
      .post('http://localhost:91/api/login.php', formData)
      .then((result) => {
        console.log(result);
        if (result.data.status === 0) {
          console.log("Errors set:", result.data.errors); 
          setErrors(result.data.errors);
          setShowModal(true); 
        } else {
          localStorage.setItem('checkInDateDB', result.data.CheckInDate); 
          localStorage.setItem('userId', result.data.id); 
          localStorage.setItem('username', result.data.username);
         
          localStorage.setItem('lastLoginDate', new Date().toDateString()); 
        
          console.log(result.data);
          navigate('/');
        }
      })
      .catch((error) => {
        console.error("Error during form submission:", error);
       });
  };

  return (
    <div className="container-auth-center">
      <div className="card card-auth">
        <div className="card-body card-auth-body">
          <h5 className="card-title text-center fw-bold fs-2 m-3">
            Login Page
          </h5>

          <form onSubmit={submitForm}>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
                value={user.email}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
                value={user.password}
              />
            </div>

            <div className="text-center">
              <button
                type="submit" // Ensure type is submit
                className="btn btn-primary btn-auth"
              >
                Submit
              </button>
            </div>
          </form>

          <div className="text-center">
            <Link to="/register" className="btn btn-primary btn-auth">Registration</Link>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal modalStyles" style={modalStyles}>
          <div className="modal-content" style={modalContentStyles}>
            <h2 className='text-danger'>Error Messages</h2>
            <hr />
            <ul>
              {errors.map((error, index) => (
                <li key={index} style={{ color: 'red' }}>{error}</li>
              ))}
            </ul>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};


// Modal Styles
const modalStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'top',
    top: '15px',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
  };
  
  const modalContentStyles = {
    backgroundColor: 'white',
    padding: '20px',
    width: '350px',
    height: '350px',
    borderRadius:'10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    lineHeight: "35px",
  };


export default Login;
