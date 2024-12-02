import React from "react";
import { VideoBackground } from "./VideoBackground";
import VideoTitle from "./VideoTitile";
import { useSelector } from "react-redux";

const MainContainer = ({ playTrailer }) => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return null;

  const mainMovie = movies[0];
  const { title, overview, id } = mainMovie;

  return (
    <div className="bg-gradient-to-r from-black z-5 w-screen">
      <VideoTitle
        title={title}
        description={overview}
        movieId={id}
        playTrailer={playTrailer}
      />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
