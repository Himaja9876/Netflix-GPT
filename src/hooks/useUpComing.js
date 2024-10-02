import { useDispatch, useSelector } from "react-redux";
import { OPTIONS } from "../utils/constants";
import { addUpComing } from "../utils/moviesSlice";
import { useEffect } from "react";

const useUpComing = () => {
  const dispatch = useDispatch();

  const getUpComing = useSelector((store) => store.movies.upComing);

  const topRated = async () => {
    const data = await fetch(
      'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', 
      OPTIONS
    );
    const json = await data.json();
    console.log(json.results);
    dispatch(addUpComing(json.results));
 }

  useEffect(() => {
   !getUpComing && topRated();
  }, []);
}

export default useUpComing;