import React from "react"; // Keep this
import { useSelector } from "react-redux"; // Only keep what is needed
import useMovieTrailer from "../hooks/useMovieTrailer"; // Keep this if needed

const FullScreenTrailer = ({ movieId, onClose }) => {
  const trailerDetails = useSelector((store) => store.movies.addTrailerVideo);

  useMovieTrailer(movieId);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center z-50">
      {trailerDetails && trailerDetails.key ? (
        <div className="relative w-screen h-screen overflow-hidden bg-black">
          <iframe
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${trailerDetails.key}?autoplay=1&controls=1&modestbranding=1&rel=0&disablekb=1`}
            title="YouTube video player"
            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: "none" }}
          ></iframe>
        </div>
      ) : (
        <p className="text-white">Loading trailer...</p>
      )}
      {/* X Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-transparent text-white text-2xl font-bold hover:text-gray-400"
        aria-label="Close"
      >
        &times; {/* This represents the X */}
      </button>
    </div>
  );
};

export default FullScreenTrailer;
