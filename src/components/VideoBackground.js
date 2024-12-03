import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerDetails = useSelector((store) => store.movies.addTrailerVideo); // Fetch trailer details
  useMovieTrailer(movieId); // Fetch trailer key for this movie

  return (
    <div className="w-screen h-screen overflow-hidden">
      <iframe
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={
          trailerDetails?.key
            ? `https://www.youtube.com/embed/${trailerDetails.key}?autoplay=1&mute=1&modestbranding=1&controls=0&loop=1&playlist=${trailerDetails.key}`
            : ""
        }
        title="Background Video"
        allow="autoplay; fullscreen; encrypted-media; accelerometer; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ border: "none" }}
      />
    </div>
  );
};

export default VideoBackground;
