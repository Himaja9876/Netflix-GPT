import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import GptSearch from "./GptSearch";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRated from "../hooks/useTopRated";
import useUpComing from "../hooks/useUpComing";
import FullScreenTrailer from "./FullScreenTrailer"; // New Component

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [trailerMovieId, setTrailerMovieId] = useState(null);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRated();
  useUpComing();

  useEffect(() => {
    document.documentElement.classList.add("scrollbar-hide");
    document.body.classList.add("scrollbar-hide");

    return () => {
      document.documentElement.classList.remove("scrollbar-hide");
      document.body.classList.remove("scrollbar-hide");
    };
  }, []);

  const playTrailer = (movieId) => {
    setTrailerMovieId(movieId);
    setIsTrailerPlaying(true);
  };

  const closeTrailer = () => {
    setIsTrailerPlaying(false);
    setTrailerMovieId(null);
  };

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : isTrailerPlaying ? (
        <FullScreenTrailer movieId={trailerMovieId} onClose={closeTrailer} />
      ) : (
        <>
          <MainContainer playTrailer={playTrailer} />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
