import { Container, Row, Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import logo from "../../images/sampleSize.jpg";
import './Theatercard.css'
export default function MyTheaterCard() {
    return (
        <>
            <Container className='py-5 background-card'>
                <Row>
                    <Col md={5} >
                        <img src={logo} height="300" alt="Your image" />
                    </Col>
                    <Col md={4}>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Accordion Item #1</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </>
    );
}


