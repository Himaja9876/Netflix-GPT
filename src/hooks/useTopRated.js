import { useDispatch } from "react-redux";
import { OPTIONS } from "../utils/constants";
import { addTopRated } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTopRated = () => {
  const dispatch = useDispatch();

  const topRated = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', 
      OPTIONS
    );
    const json = await data.json();
    console.log(json.results);
    dispatch(addTopRated(json.results));
 }

  useEffect(() => {
    topRated();
  }, []);
}

export default useTopRated;