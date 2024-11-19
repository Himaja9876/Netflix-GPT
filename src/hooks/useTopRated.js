/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { OPTIONS } from "../utils/constants";
import { addTopRated } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTopRated = () => {
  const dispatch = useDispatch();

  const getTopRated = useSelector((store) => store.movies.topRated)

  const topRated = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', 
      OPTIONS
    );
    const json = await data.json();
    //console.log(json.results);
    dispatch(addTopRated(json.results));
 }

  useEffect(() => {
    !getTopRated && topRated();
  }, []);
}

export default useTopRated;