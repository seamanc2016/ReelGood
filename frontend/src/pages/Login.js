import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'

import {useState, useEffect, useContext} from 'react';
import {getAuth, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import '../config/firebase-config';

import { AuthContext } from '../Context/authContext';

function Login(){

  const {Auth, setAuth} = useContext(AuthContext);
  const [token, setToken] = useState('');   // sets token

  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  useEffect(()=>{
    const auth = getAuth();
    auth.onAuthStateChanged((user) => { // when users login state changes...
      if(user){
        console.log(user)
        //setAuth(true);
        // userCred.getIdToken().then((token)=>{
        //   setToken(token);
        // })
      }
    })
  }, [])

  // called when user logs in
  const login = (e) => {
    e.preventDefault();

    // authenticates with google using api credentals
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
    .then((usercredentials) => {  // If usercredentials are returned, user exist, hence login
      if(usercredentials){
        //setAuth(true)
      }
    }).catch((e) => { // else catch and print errors
      console.log(e.code)
      console.log(e.message);
    });
    
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