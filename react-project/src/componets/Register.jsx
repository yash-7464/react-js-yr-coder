import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    const formData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
    };

    axios
      .post('http://localhost:91/api/insert.php', formData)
      .then((result) => {
        console.log("API Response:", result.data);

        if (result.data.status === 0) {
          // console.log("Errors set:", result.data.errors); // Debugging statement
          setErrors(result.data.errors);
          setShowModal(true); // Open modal on error
        } else {
          navigate('/login');
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
            Registration Page
          </h5>

          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                onChange={handleChange}
                value={data.first_name}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                onChange={handleChange}
                value={data.last_name}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
                value={data.email}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
                value={data.password}
              />
            </div>

            <div className="text-center">
              <button
                type="submit" 
                className="btn btn-primary btn-auth"
              >
                Submit
              </button>
            </div>
          </form>

          <div className="text-center">
            {/* <a href="#" className="btn btn-primary btn-auth">Login</a> */}
            <Link to="/login" className="btn btn-primary btn-auth">Login</Link>
          </div>
        </div>
      </div>

      {/* Modal Implementation */}
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
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '5px',
  width: '350px',
  height: '350px',  
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  lineHeight: "35px",
};

export default Register;
