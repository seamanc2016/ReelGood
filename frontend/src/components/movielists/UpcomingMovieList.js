import { useEffect, useState } from 'react';
import axios from "axios";
import { Container, Row, Col } from 'react-bootstrap';
import PageNavigation from '../pagenavigation/PageNavigation.js';
import MovieCard from '../moviecard/MovieCard.js';


const UpcomingMovieList = () => {
    //Set states
    let [response, setResponse] = useState(null);
    let [error, setError] = useState(null);
    let [page, setPage] = useState(1);

    //Function for Axios call to backend server to get Upcoming Movies
    function getUpcomingMovies(page) {
        axios.get(`http://localhost:5678/movie/upcoming`, {
            params: {
                page: page
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

    //Call function to get now playing movies whenever this component re-renders
    useEffect(() => {
        getUpcomingMovies(page)
    }, [page])


    //Generate the Now Playing movie list
    return (
        <>
            {/*If the response object isn't null, generate the movie list */}
            {response && (
                <>
                    <h4 className='result-info text-center my-2'>
                        {response.total_results > 10000 ? 10000 : response.total_results} results found.
                        Showing page {response.page} of {response.total_pages > 500 ? 500 : response.total_pages}.
                    </h4>
                    <Container>
                        {/*Edit the line below to adjust the amount of movies shown per row based on the screensize*/}
                        <Row xs={1} sm={1} md={2} lg={3} xl={5}>
                            {response.results.map((movie) => (
                                <Col key={movie.id} className="d-flex align-items-stretch mb-4">
                                    <MovieCard movie={movie} />
                                </Col>
                            ))}
                        </Row>
                    </Container>

                    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <PageNavigation
                            setPage={setPage}
                            currentPageNumber={page}
                            totalPages={response.total_pages > 500 ? 500 : response.total_pages}>
                        </PageNavigation>
                    </Container>
                </>
            )}

            {/*If an error occured, report it to the client*/}
            {error && (<div className='error-message text-center' style={{color: 'red'}}>{error}</div>)}
        </>
    );
};

export default UpcomingMovieList;
