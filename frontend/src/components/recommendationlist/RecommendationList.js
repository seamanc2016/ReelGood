import { useEffect, useState } from 'react';
import axios from "axios";
import RecommendationCard from '../recommendationcard/RecommendationCard';

const RecommendationList = (props) => {
    //Set states
    let [response, setResponse] = useState(null);
    let [error, setError] = useState(null);

    //Function for Axios call to backend server to get movie recommendations
    function getRecommendedMovies(movieID) {
        axios.get(`/movie/${movieID}/recommendations`, {
            params: {
                page: 1
            }
        })
            .then(function (response) {
                //On success
                //Change unused states accordingly
                setError(null);

                // Get response data and update accordingly
                // console.log(response);
                setResponse(response.data);
            })
            .catch(function (error) {
                // On error
                // console.log(error);
                if (error.response) {
                    //Change unused states accordingly
                    setResponse(null);

                    // Get error data and display error message accordingly
                    const errorMessage = error.response.data.status_message;
                    setError(errorMessage);
                }
            });
    }

    //Call function to get recommended movies whenever this component re-renders
    useEffect(() => {
        getRecommendedMovies(props.movieID)
    }, [props.movieID])


    //Generate the recommended movie list
    return (
        <div className="container border border-gray my-2">
            {/*If the response object isn't null and has at least one item, generate the movie list */}
            {response && response.results.length > 0 && (
                <>
                    <h4 className='text-center'>Recommendation List</h4>
                    <div className="container">
                        <div className="d-flex flex-row cover-container">
                            {/*Only showing first 10*/}
                            {response.results.slice(0, 10).map((movie) => (
                                <div key={movie.id}>
                                    <RecommendationCard
                                        movie={movie}
                                        movieID={props.movieID}
                                        setMovieID={props.setMovieID}
                                        history={props.history}
                                        setHistory={props.setHistory}
                                    ></RecommendationCard>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/*If the response object isn't null and has at least one item, generate the movie list */}
            {response && response.results.length === 0 && (
                <>
                    <h4 className='text-center'>Recommendation List</h4>
                    <p className='text-center'>Unknown.</p>
                </>
            )}

            {/*If an error occured, report it to the client*/}
            {error && (
                <>
                    <h4 className='text-center'>Recommendation List</h4>
                    <div className='error-message text-center' style={{ color: 'red' }}>Recommendation List Error: {error}</div>
                </>
            )}
        </div>
    );
};

export default RecommendationList;


//For testing, get rid of or comment out in final work
// RecommendationList.defaultProps = {
//     movieID: 502356
// }