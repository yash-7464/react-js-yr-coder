import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [user, setUser] = useState({username:"", email:"", password:"" });
    const [msg, setMsg] = useState();
    const navigate = useNavigate();

    const handelClick = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    const handleUser = async (e) => {
        e.preventDefault();
        const userData = { username: user.username, email: user.email, password: user.password };
    
        const res = await axios.post("http://localhost:90/api/user_post.php?action=registration", userData);

        if(res){
            setTimeout(() => {
                navigate("/");
            },2000)
            setMsg(res.data.success);
        }
           
    };
    
    return (
        <>
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <Card style={{width: '20rem'}}>
                    <Card.Body>
                        <Card.Title>Registration Form</Card.Title>  
                        <p className='text-red'>{msg}</p>
                        <Form onSubmit={handleUser}>
                            <Form.Group className="mb-3" controlId="formBasicUserName">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control type="text" name="username" placeholder="Enter username" onChange={handelClick}/>
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="Enter email" onChange={handelClick}/>
                            </Form.Group>
    
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password" onChange={handelClick} />
                            </Form.Group>
    
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
    
                    </Card.Body>
                </Card>
            </div>
        </>
      ) 
}

export default Registration
