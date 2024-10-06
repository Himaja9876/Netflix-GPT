// useMovieTrailers.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerKey } from "../utils/trailerSlice";
import { OPTIONS } from "../utils/constants";

const useMovieTrailers = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const trailerKeys = useSelector((store) => store.trailers.trailerKeys);

  useEffect(() => {
    const fetchTrailers = async () => {
      const allMovies = [...(nowPlayingMovies || []), ...(popularMovies || [])];
      for (const movie of allMovies) {
        if (!trailerKeys[movie.id]) {
          const data = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`,
            OPTIONS
          );
          const json = await data.json();
          const trailerVideo = json.results.find(
            (video) => video.type === "Trailer"
          );
          if (trailerVideo) {
            dispatch(addTrailerKey({ id: movie.id, key: trailerVideo.key }));
          }
        }
      }
    };

    fetchTrailers();
  }, [nowPlayingMovies, popularMovies, dispatch, trailerKeys]);
};

export default useMovieTrailers;
