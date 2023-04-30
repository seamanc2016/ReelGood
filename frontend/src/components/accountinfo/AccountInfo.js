import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
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
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      // Make call to backend server
      const response = await axios.get(`/accountinfo/${userID}`);
      // On success
      console.log(response);
      setResponse(response.data);
      setLoading(false);
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
    <div>
      <h1>Account Information</h1>
      {response && response.data && response.data.length > 0 ? (
        <ul>
          <li>First Name: {response.data[0].first_name}</li>
          <li>Last Name: {response.data[0].last_name}</li>
          <li>Zip code: {response.data[0].zipcode}</li>
          <li>State: {response.data[0].state}</li>
          <li>Email: {response.data[0].email}</li>
        </ul>
      ) : (
        <div>No account information found</div>
      )}
    </div>
  );
}

export default AccountInfo;
