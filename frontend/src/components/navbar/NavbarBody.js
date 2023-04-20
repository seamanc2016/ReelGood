import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../reelgood_logo.png';

import { Navbar, Nav, Form, Button, ButtonGroup, Image, Container } from 'react-bootstrap'
import MySearchBar from './SearchBar';

import {Link} from 'react-router-dom'

import { useState, useEffect, createContext } from 'react';

import {getAuth, signOut} from 'firebase/auth';
import '../../config/firebase-config';

import AuthContext from '../userauth/AuthContext';

// Sets context. Is a global variable for components

export default function MyNavbar() {

    const [Auth, setAuth] = useState(false)

    const authbutton = () => {
        if(!Auth){
            return(
            <ButtonGroup>
                <Button variant="secondary" as={Link} to="/Login">Login</Button>
                <Button variant="secondary" as={Link} to="/Register">Signup</Button>
            </ButtonGroup>
            );
        }else{
            return <Button variant="warning" onSubmit={signout}>Logout</Button>
        }

    }

    const signout = (e) =>{
        e.preventDefault();
    
        // authenticates with google using api credentals
        const auth = getAuth()
        signOut()
        .then(// signout successful
        ).catch((e) => { // else catch and print errors
          console.log(e.code)
          console.log(e.message);
        });
    }

    useEffect(()=>{
        const auth = getAuth();
        auth.onAuthStateChanged((user) => { // when users login state changes...
          if(user){
            console.log(user)
            // setAuth(false);
            // userCred.getIdToken().then((token)=>{
            //   setToken(token);
            // })
          }
        })
      }, [])

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid> {/* Warning: bottom marging might exceed visual.*/}
                <Image src={logo} alt="Logo" width={80} height={60} />
                <Navbar.Toggle aria-controls="basic-navbar=nav" />
                <AuthContext.Provider value={Auth}> {/* Here pass Auth state value to login*/}
                    <Navbar.Collapse id="responsive-navbar-nav">            
                        <Nav>
                            <Nav.Link as={Link} to='/'>Home</Nav.Link>
                            <Nav.Link as={Link} to='/nowplaying'>Now Playing</Nav.Link>
                            <Nav.Link as={Link} to='/popular'>Popular</Nav.Link>
                            <Nav.Link as={Link} to='/theater'>Theather</Nav.Link>
                            <Nav.Link as={Link} to='/upcoming'>Upcoming</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Form inline className="mx-3">
                        {authbutton()}
                    </Form>
                </AuthContext.Provider>
                <MySearchBar/>
            </Container>
        </Navbar>
    )
}
