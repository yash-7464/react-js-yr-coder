import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'; 

const Login = () => {
    const [loginUser, setLoginUser] = useState({ email: "", password: "" });
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user']);

    const handleClick = (e) => {
        setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
    }

    const handleUser = async (e) => {
        e.preventDefault();
        setMsg(''); // Clear previous messages
        setLoading(true); // Set loading state

        // Basic validation
        if (!loginUser.email || !loginUser.password) {
            setMsg("Please fill in both fields.");
            setLoading(false);
            return;
        }

        try {
            const userData = { email: loginUser.email, password: loginUser.password };
            const res = await axios.post("http://localhost:90/api/user_post.php?action=login", userData);

            console.log(res.data);

            if (res.data.status === 1) {
             
                // localStorage.setItem('userId', res.data.id); // Assuming your API returns user ID
                // localStorage.setItem('username', res.data.username); // Assuming your API returns username

                setCookie('userId', res.data.id, { path: '/' });
                setCookie('username', res.data.username, { path: '/' });

                navigate("/home");
            } else {
                setMsg(res.data.success || "Login failed. Please try again.");
            }
        } catch (error) {
            setMsg("An error occurred while logging in. Please try again later.");
        } finally {
            setLoading(false); // Reset loading state
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <Card style={{ width: '20rem' }}>
                <Card.Body>
                    <Card.Title>Login Form</Card.Title>
                    {msg && <p className="text-danger">{msg}</p>}
                    <Form onSubmit={handleUser}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleClick} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={handleClick} />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Submit'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;
