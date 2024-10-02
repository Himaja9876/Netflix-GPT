import { useDispatch, useSelector } from "react-redux";
import { OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = useSelector((store) => store.movies.popularMovies)

  const popularMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', 
      OPTIONS
    );
    const json = await data.json();
    console.log(json.results);
    dispatch(addPopularMovies(json.results));
 }

  useEffect(() => {
    !getPopularMovies && popularMovies();
  }, []);
}

export default usePopularMovies;