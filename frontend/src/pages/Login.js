import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import '../config/firebase-config';
import Alert from 'react-bootstrap/Alert';

import { UserContext } from '../Context/UserContext';

import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {

  const { User, setUser, Token, setToken, CheckAuthStateChanged } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  // used to naviate to different locations
  const navigate = useNavigate();

  // called when user logs in
  const login = async (e) => {
    e.preventDefault();
    navigate('/');  // navigate back to home page   
    // authenticates with google using api credentals
    const auth = getAuth()

    const Token = await signInWithEmailAndPassword(auth, email, password)
      .then((usercredentials) => {  // If usercredentials are returned, user exist, hence login
        if (usercredentials) {
          // If user exist, set user
          setUser(usercredentials.user);

          // Return Token
          return usercredentials.user.getIdToken().then((token) => {
            setToken(token)
            return token;
          });

        }
      }).catch((e) => { // else catch and print errors
        console.log(e.code)
        console.log(e.message);
        setToken(false);  // set token to false incase of error
        return;
      });


    const options = {
      headers: {
        Authorization: 'Bearer ' + Token,
        "Content-Type": "text/plain",
        "CSRF-Token": Cookies.get("XSRF-TOKEN"),
        withCredentials: true
      }
    }

    // if successfull login, sent request to backend for a session
    if (Token) {
      const res = await axios.get('/Login', options);
      console.log(res.data);
    }

    // check to see if users state has changed
    CheckAuthStateChanged();

  }


  return (
    <Container className='py-5' fluid>
      <Row className='justify-content-center'>
        <Col md={6}>
          <h1 className='text-center mb-5'>Login</h1>
          <Form onSubmit={login}>
            <Form.Group className='pt-3' controlId='formemail'>
              <Form.Label>Email address:</Form.Label>
              <Form.Control type="email" placeholder="Email Address" onChange={(e) => { setEmail(e.target.value) }} />
            </Form.Group>
            <Form.Group className='pt-3' controlId='formpassword'>
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => { setpassword(e.target.value) }} />
            </Form.Group>
            <div className='d-flex justify-content-end pt-3'>
              <Button variant="warning" type="submit">
                Submit
              </Button>
              <Button className='mx-2' variant='outline-secondary'>Log in with Google</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login