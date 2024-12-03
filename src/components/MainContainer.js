import React, { useState } from "react";
import Header from "./Header";
import VideoTitle from "./VideoTitile";
import VideoBackground from "./VideoBackground";
import FullScreenTrailer from "./FullScreenTrailer";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies); // Fetch now-playing movies
  const trailerDetails = useSelector((store) => store.movies.addTrailerVideo); // Trailer details from Redux
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false); // Control fullscreen trailer
  const [trailerKey, setTrailerKey] = useState(null); // Store trailer key for fullscreen

  if (!movies) return null;

  const mainMovie = movies[0];
  const { title, overview, id } = mainMovie;

  // Fetch the trailer key for the main movie using Redux
  const playTrailer = () => {
    if (trailerDetails?.key) {
      setTrailerKey(trailerDetails.key); // Use the trailer key from Redux
      setIsTrailerPlaying(true); // Show fullscreen trailer
    }
  };

  // Close fullscreen trailer
  const closeTrailer = () => {
    setIsTrailerPlaying(false); // Hide the fullscreen trailer
    setTrailerKey(null); // Reset the trailer key
  };

  return (
    <div className="bg-gradient-to-r from-black z-5 w-screen">
      {/* Header */}
      <Header />

      {/* Main Title Section with Play Button */}
      <VideoTitle
        title={title}
        description={overview}
        movieId={id}
        playTrailer={playTrailer} // Pass play handler for Play button
      />

      {/* Background Video */}
      <VideoBackground movieId={id} />

      {/* Fullscreen Trailer */}
      {isTrailerPlaying && (
        <FullScreenTrailer
          trailerKey={trailerKey} // Pass the same trailer key
          onClose={closeTrailer} // Handle close
        />
      )}
    </div>
  );
};

export default MainContainer;
