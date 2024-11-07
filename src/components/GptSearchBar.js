import React from "react";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.lang.lang);
  console.log(langKey);
  const searchText = useRef(null);
  //console.log(lang[langKey]);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      OPTIONS
    );
    const json = await data.json();
    //console.log(json);
    return json.results;
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    // Make an API call to GPT API and get Movie Results

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    console.log(gptResults.choices?.[0]?.message?.content);
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(","); //gives array of movies

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie)); //as it is an async funtion, it return (first empty promise, then updates)promises for each movie
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray); //we're not sure how much time it takes for each promise to resolve so promise.all waits till all the promises gets resolved

    console.log(tmdbResults); // we got all the movies that matches with the names from TMDB API ( each move has dofferent lang)
    //will store these results in redux

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 h-14 md:h-16 bg-black grid grid-cols-12 grid-rows-4 gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="col-span-9 p-4 h-10 md:h-12 mt-2 ml-2"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 bg-red-700 rounded-lg text-white h-10 md:h-12 mt-2 mr-2"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
