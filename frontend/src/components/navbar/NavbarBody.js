import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../images/reelgood_logo.png';
import { Navbar, Nav, Form, Button, ButtonGroup, Image, Container } from 'react-bootstrap'
import MySearchBar from './SearchBar';

import {Link} from 'react-router-dom'

import { useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

import {getAuth, signOut} from 'firebase/auth';
import '../../config/firebase-config';


export default function MyNavbar() {

    // Using UserContext to access Use and setUser
    const {User, setUser} = useContext(UserContext);

    const signout = (e) => {
        e.preventDefault();
    
        // authenticates with google using api credentals
        const auth = getAuth()
        auth.signOut()
        .then(() => {
            console.log("in this statements")
            setUser(null)
        }).catch((e) => { // else catch and print errors
          console.log(e.code)
          console.log(e.message);
        });
    }

    const authbutton = () => {
        if(!User){  // If Not Authenticated Show Login and Signup
            return(
            <ButtonGroup>
                <Button variant="outline-light" as={Link} to="/Login">Login</Button>
                <Button variant="outline-light" as={Link} to="/Register">Signup</Button>
            </ButtonGroup>
            );
        }else{  // If Authenticated Show Logout
            return (<Button variant="warning" onClick={signout}>Logout</Button>);
        }

    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg"> {/* This component is a container towards the navbar. */}
            <Container fluid> {/* Warning: bottom marging might exceed visual.*/}
                <Image src={logo} alt="Logo" width={80} height={60} />
                <Navbar.Toggle aria-controls="basic-navbar=nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">            
                        <Nav>
                            <Nav.Link as={Link} to='/'>Home</Nav.Link>
                            <Nav.Link as={Link} to='/nowplaying'>Now Playing</Nav.Link>
                            <Nav.Link as={Link} to='/popular'>Popular</Nav.Link>
                            <Nav.Link as={Link} to='/theater'>Theather</Nav.Link>
                            <Nav.Link as={Link} to='/upcoming'>Upcoming</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                <MySearchBar/> {/* This component loads the searchbar component. */}
                <Form inline className="mx-3">
                        {authbutton()}
                    </Form>
            </Container>
        </Navbar>
    )
}
