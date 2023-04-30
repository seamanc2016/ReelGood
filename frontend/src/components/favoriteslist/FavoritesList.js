import { useEffect} from 'react';
import axios from "axios";
import { useContext, useState } from 'react';
import { UserContext } from "../../Context/UserContext";
import FavoriteCard from '../favoritecard/FavoriteCard';

const FavoriteList = (props) => {
    //Set states
    let [response1, setResponse1] = useState(null);
    let [response2, setResponse2] = useState(null);
    let [error, setError] = useState(null);

    //Getting userID
    const { User } = useContext(UserContext);
    let userID = JSON.parse(User).uid;


    //Function for Axios call to backend server to get favorite movies from user:
    function getFavorites() {
        axios.get(`/favorites/${userID}`, {
        })
            .then(function (response1) {
                //On success
                //Change unused states accordingly
                setError(null);
                // Get response data and update accordingly
                // console.log(response);
                setResponse1(response1.data);
            })
            .catch(function (error) {
                // On error
                // console.log(error);
                if (error.response1) {
                    //Change unused states accordingly
                    setResponse1(null);

                    // Get error data and display error message accordingly
                    const errorMessage = error.response1.data.status_message;
                    setError(errorMessage);
                }
            });
    }

    //Call function to get actors whenever this component re-renders
    useEffect(() => {
        getFavorites(props.movieID)
    }, [props.movieID])


    //Generate the actor list
    return (
        <>
            {/*If the response object isn't null and has at least one item, generate the movie list */}
            {response2 && response2.results.length > 0 && (
                <>
                    <h4 className='text-center'>Recommendation List</h4>
                    <div className="container border border-gray my-2">
                        <div className="d-flex flex-row cover-container">
                            {/*Only showing first 10*/}
                            {response2.results.map((movie) => (
                                <div key={movie.id}>
                                    <FavoriteCard
                                        movie={movie}
                                        movieID={props.movieID}
                                        setMovieID={props.setMovieID}
                                        history={props.history}
                                        setHistory={props.setHistory}
                                    ></FavoriteCard>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/*If the response object isn't null and has at least one item, generate the actor list */}
            {response2 && response2.results.length === 0 && (
                <>
                    <h4 className='text-center'>Favorite List</h4>
                    <p className='text-center'>No favorite movies, go add some :)</p>
                </>

            )}

            {/*If an error occured, report it to the client*/}
            {error && (
                <>
                    <h4 className='text-center'>Favorite List</h4>
                    <div className='error-message text-center' style={{ color: 'red' }}>Favorites List Error: {error}</div>
                </>
            )}
        </>
    );
};

export default FavoriteList;


//For testing, get rid of or comment out in final work
// ActorList.defaultProps = {
//     movieID: 502356
// }