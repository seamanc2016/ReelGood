import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { Container, Row, Col } from "react-bootstrap";
import DefaultProfPic from "../../images/default-prof-pic.PNG";

function AccountInfo(props) {
    // Getting userID
    let { User } = useContext(UserContext);
    let userID = JSON.parse(User).uid;

    // Set states
    let [response, setResponse] = useState(null);
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(false);

    // Write function to get Account Information for the current user with the passed ID
    async function getAccountInfo(userID) {
        // Clearing old response data and resetting loading state
        //setLoading(true);
        setResponse(null);
        setError(null);

        try {
            // Make call to backend server
            const response = await axios.get(`/accountinfo/${userID}`);
            // On success
            setResponse(response.data);
            console.log(response);
            //setLoading(false);
        } catch (error) {
            // On error
            // console.log(error);
            if (error.response) {
                // Get error data and display error message accordingly
                const errorMessage = error.response.data.status_message;
                setError(errorMessage);
                setLoading(false);
            }
        }
    }

    // Call function to get account details whenever this component re-renders or userID changes
    useEffect(() => {
        getAccountInfo(userID);
    }, [userID]);

    // Render loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Generate the account information
    return (
        <Container className="d-flex justify-content-center align-items-center h-100">
            <Row>
                <Col className="bg-white p-8 rounded-md">
                    <h1 className="text-3xl font-bold mb-8">Account Information</h1>
                    <ul>
                        <li className="mb-2">
                            <span className="font-semibold">First Name: </span>
                            Work in progress
                        </li>
                        <li className="mb-2">
                            <span className="font-semibold">Last Name: </span>
                            Work in progress
                        </li>
                        <li className="mb-2">
                            <span className="font-semibold">Zip code: </span>
                            Work in progress
                        </li>
                        <li className="mb-2">
                            <span className="font-semibold">State: </span>
                            Work in progress
                        </li>
                        <li className="mb-2">
                            <span className="font-semibold">Email: </span>
                            Work in progress
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    );
}

export default AccountInfo;
