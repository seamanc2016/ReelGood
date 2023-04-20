import 'bootstrap/dist/css/bootstrap.css';
import logo from '../../reelgood_logo.png';
import { Navbar, Nav, Container, Image} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MySearchBar from './SearchBar';
export default function MyNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container className="mb-6" fluid> {/* Warning: bottom marging might exceed visual.*/}
                    <Image src={logo} alt="Logo" width={80} height={60} /> 
                <Navbar.Toggle aria-controls="basic-navbar=nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to='/'>Home</Nav.Link>
                        <Nav.Link as={Link} to='/nowplaying'>Now Playing</Nav.Link>
                        <Nav.Link as={Link} to='/popular'>Popular</Nav.Link>
                        <Nav.Link as={Link} to='/theater'>Theather</Nav.Link>
                        <Nav.Link as={Link} to='/upcoming'>Upcoming</Nav.Link>
                        <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <Container> {/* Move TO THE RIGTH*/}
                <MySearchBar />
            </Container>
        </Navbar>
    )
}
