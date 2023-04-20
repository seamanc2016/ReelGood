import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container'

import {useState, useEffect} from 'react';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import '../config/firebase-config';

function Register(){


  const [Auth, setAuth] = useState(false);  // determines if user is authenticated
  const [token, setToken] = useState('');   // sets token

  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  useEffect(()=>{
    const auth = getAuth();
    auth.onAuthStateChanged((user) => { // when users login state changes...
      if(user){
        console.log(user)
        // setAuth(true);
        // userCred.getIdToken().then((token)=>{
        //   setToken(token);
        // })
      }
    })
  }, [])

  const reg = (e) =>{
    e.preventDefault();

    // authenticates with google using api credentals
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, email, password)
    .then((usercredentials) => {  // If usercredentials are returned, user exist, hence login
      if(usercredentials){
        setAuth(true)
      }
    }).catch((e) => { // else catch and print errors
      console.log(e.code)
      console.log(e.message);
    });
}

  return(
    <>
      <Container className='p-5'  fluid>
      <Form onSubmit={reg}>
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
    </>
  );
}
export default Register