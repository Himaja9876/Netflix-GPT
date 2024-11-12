import React from "react";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRated from "../hooks/useTopRated";
import useUpComing from "../hooks/useUpComing";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRated();
  useUpComing();
  //useMovieTrailers();

  useEffect(() => {
    document.documentElement.classList.add("scrollbar-hide");
    document.body.classList.add("scrollbar-hide");

    return () => {
      document.documentElement.classList.remove("scrollbar-hide");
      document.body.classList.remove("scrollbar-hide");
    };
  }, []);

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
