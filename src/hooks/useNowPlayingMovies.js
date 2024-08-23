import { useDispatch } from "react-redux";
import { OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const nowPlayingMovies = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', 
      OPTIONS
    );
    const json = await data.json();
    //console.log(json.results);
    dispatch(addNowPlayingMovies(json.results));
 }

  useEffect(() => {
   nowPlayingMovies();
  }, []);
}

export default useNowPlayingMovies;