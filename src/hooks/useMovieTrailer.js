import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from '../utils/moviesSlice';
import {OPTIONS} from "../utils/constants";

const useMovieTrailer = (movieId) => {

    const dispatch = useDispatch();

    const videoDetails = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/'+movieId+'/videos?language=en-US', OPTIONS)
        const json = await data.json();
        //console.log(json);
    
        const trailerVideo = json.results.filter((trailer) => trailer.name === "Final Trailer");
        //console.log(trailerVideo);
        dispatch(addTrailerVideo(trailerVideo));
      }
    
      useEffect(() => {
        videoDetails();
      }, []);
}

export default useMovieTrailer;