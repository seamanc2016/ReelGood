import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetailsCard from '../components/moviedetailscard/MovieDetailsCard';
import ActorList from '../components/actorlist/ActorList';
import RecommendationList from '../components/recommendationlist/RecommendationList';

function MovieDetails(props) {
  //Right now, I'm emulating the MovieDetailsPage. Technically, it will get a prop to set movieID initial state with.
  const { id } = useParams();
  console.log(id);
  let [movieID, setMovieID] = useState(id);
  let [history, setHistory] = useState([]);

  //Go back to search results page
  //Not added yet

  //Go back to previous movie viewed
  function goToPreviousMovie(history) {
    console.log(history);
    setHistory(history.slice(0, -1));
    setMovieID(history[history.length - 1]);
  }

  return (
    <>
      {/*Navigation Buttons*/}
      <div className="text-center mt-3">
        <button className="btn btn-dark me-1">Go Back To Search Results</button>
        {history && history.length > 0 && (<button className="btn btn-dark me-1" onClick={() => goToPreviousMovie(history)}>View Previous</button>)}
      </div>
      
      {/*Main content*/}
      <MovieDetailsCard movieID={movieID} />
      <ActorList movieID={movieID} />
      <RecommendationList setMovieID={setMovieID} setHistory={setHistory} movieID={movieID} history={history} />

    </>
  );
}

export default MovieDetails;
