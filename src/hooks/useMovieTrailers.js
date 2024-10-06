// useMovieTrailers.js
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrailerForMovie } from "../utils/trailerSlice"; // Import the thunk instead of addTrailerKey

const useMovieTrailers = (movieId) => {
  const dispatch = useDispatch();
  const trailerKey = useSelector(
    (store) => store.trailers.trailerKeys[movieId]
  );

  const fetchTrailer = useCallback(() => {
    if (!trailerKey) {
      dispatch(fetchTrailerForMovie(movieId));
    }
  }, [dispatch, movieId, trailerKey]);

  return { trailerKey, fetchTrailer };
};

export default useMovieTrailers;
