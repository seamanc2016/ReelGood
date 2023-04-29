import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import DefaultProfPic from "../../images/default-prof-pic.PNG";

function AccountInfo(props) {
    //Getting userID
    let { User } = useContext(UserContext);
    let userID = JSON.parse(User).uid;

    //Set states
    let [response, setResponse] = useState(null);
    let [error, setError] = useState(null);
    let [loading, setLoading] = useState(false);

    //Write function to get Account Information for the current user with the passed ID
    function getAccountInfo(userID) {

        //Clearing old response data and resetting loading state
        setLoading(true);
        setResponse(null);
        setError(null);

        //Make call to backend server
        axios.get(`/profile/${userID}`, {

        })
            .then(function (response) {
                //On success
                // console.log(response);
                setResponse(props.data);
                setLoading(false);
            })
            .catch(function (error) {
                // On error
                // console.log(error);
                if (error.response) {
                    // Get error data and display error message accordingly
                    const errorMessage = error.response.data.status_message;
                    setError(errorMessage);
                    setLoading(false);
                }

            });
    }

    //Call function to get movie details whenever this component re-renders
    useEffect(() => {
        getAccountInfo(userID);
    }, [userID])

    //Generate the Account Information
    return (
        <>
            {loading && (<h4 className="text-center">Please wait...</h4>)}

            {!response && (
                <div className="container border border-gray my-2">
                    <div className="text-center">
                        <h4 className="text-center">Account Information</h4>
                        <img className="img-fluid img-thumbnail h-25 w-25" src={DefaultProfPic} alt="..." /> 
                    </div>
                    <div className="d-flex flex-row justify-content-between mx-3">
                            <div>
                                <b>First Name: </b>{props.data.first_name}
                            </div>
                            <div>
                                <b>Last Name: </b>{props.data.last_name}
                            </div>
                    </div>
                    <div className="d-flex flex-row justify-content-between mx-3">
                            <div>
                                <b>Email: </b>{props.data.email}
                            </div>
                            <div>
                                <b>Username: </b>{props.data.username}
                            </div>
                    </div>
                    <div className="d-flex flex-row justify-content-between mx-3">
                            <div>
                                <b>State: </b>{props.data.state}
                            </div>
                            <div>
                                <b>ZIP: </b>{props.data.zipcode}
                            </div>
                    </div>


                </div>
            )}

            {/*If an error occured, report it to the client*/}
            {error && (
                <>
                    <div className='error-message text-center' style={{ color: 'red' }}>Profile Page Error: {error}</div>
                </>
            )}
        </>
    )
}

export default AccountInfo;

AccountInfo.defaultProps = {
    data: {
        "first_name": "Eyan",
        "last_name": "Eubanks",
        "email": "eeubanks2016@fau.edu",
        "username": "eeubanks",
        "zipcode": 33212,
        "state": "Florida",
    }
}