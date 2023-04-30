import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../Context/UserContext";

function FavoriteButton(props) {

    //Get props
    let movieID = props.movieID;
    //Also getting setLoading as a prop

    //Getting userID
    const {User, setUser,Token, setToken, CheckAuthStateChanged} = useContext(UserContext);
    let userID = JSON.parse(User).uid;

    //Set states
    let [response, setResponse] = useState(null);
    let [error, setError] = useState(null);
    let [favorite, setFavorite] = useState(false);

    //Set proper state for Favorite button using DB data
    function getFavorites() {
        axios.get(`/favorites/${userID}`, { //Modify path as necessary
        })
            .then(function (response) {
                //On success
                //Take the response array and try to find the current movie ID in it.
                //If it's in there, that movie was favorited. So the intial state needs to be setFavorite(true)
                //Else, setFavorite(false)
                console.log(response); //Or just check the response in Network
            })
            .catch(function (error) {
                // On error
                //Assume the code doesn't have a stroke for now
                console.log(error);
            });
    }

    //Now after the button's state is initially set, here's how the user can change it dynamically
    //For favoriting the movie
    function addToFavorites() {
        //Change button on frontend
        setFavorite(true);

        //Make axios call to add favorite endpoint
        axios.post(`/Favorite`, {
            movieId: props.movieID,
            uid: userID
        })
            .then(function (response) {
                //On success
                console.log(response);
            })
            .catch(function (error) {
                // On error
                console.log(error);
            });

    }

    //For removing from favorites
    function removeFromFavorites(movieID) {
        //Change button on frontend
        setFavorite(false);

        //Make axios call to add favorite endpoint
        axios.post(`/Favorite`, {
            movieId: props.movieID,
            uid: userID
        })
            .then(function (response) {
                //On success
                console.log(response);
            })
            .catch(function (error) {
                // On error
                console.log(error);
            });
    }


    return (
        <>
            {favorite ? (<button type="button" className="btn btn-danger me-1" onClick={removeFromFavorites}>Unfavorite</button>)
                :
                (<button type="button" className="btn btn-success me-1" onClick={addToFavorites}>Favorite</button>)
            }
        </>
    )
}

export default FavoriteButton;