import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'

import {useState, useEffect, useContext} from 'react';
import {getAuth, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import '../config/firebase-config';

import { UserContext } from '../Context/UserContext';

import axios from 'axios';
import Cookies from 'js-cookie';

function Login(){

  const {User, setUser,Token, setToken, CheckAuthStateChanged} = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  // called when user logs in
  const login = async (e) => {
    e.preventDefault();

    // authenticates with google using api credentals
    const auth = getAuth()

    const Token = await signInWithEmailAndPassword(auth, email, password)
    .then((usercredentials) => {  // If usercredentials are returned, user exist, hence login
      if(usercredentials){

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


    const options ={
      headers: {
        Authorization: 'Bearer ' + Token,
        "Content-Type": "text/plain",
        "CSRF-Token":Cookies.get("XSRF-TOKEN"),
        withCredentials: true
      }
    }

    // if successfull login, sent request to backend for a session
    if(Token){
      const res = await axios.get('/Login',options);
      console.log(res.data);
    }

    // check to see if users state has changed
    CheckAuthStateChanged();
    
  }
  return(
    <Container className='p-5'  fluid>
      <h1>Login</h1>
      <Form onSubmit={login}>
        <Form.Group className='' controlId='formemail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="email address" onChange={(e) => {setEmail(e.target.value)}}/ >
        </Form.Group>
        <Form.Group className='' controlId='formpassword'>
          <Form.Label>password</Form.Label>
          <Form.Control type="password" placeholder="password" onChange={(e) => {setpassword(e.target.value)}}/ >
        </Form.Group>
        <Button variant="warning" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default Login