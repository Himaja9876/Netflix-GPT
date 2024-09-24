import React from 'react'
import { VideoBackground } from './VideoBackground'
import VideoTitle from './VideoTitile'
import {useSelector} from "react-redux";

const MainContainer = () => {

  const movies = useSelector(store => store.movies?.nowPlayingMovies);
  //console.log(movies);

  if(!movies) return;

  const mainMovie = movies[2];
  //console.log(mainMovie);

  const {title, overview, id} = mainMovie;

  return (
    <div>
        <VideoTitle title={title} description={overview}/>
        <VideoBackground movieId={id}/> 
    </div>
  )
}

export default MainContainer