import { useState, useEffect, useRef } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import useMovieTrailers from "../hooks/useMovieTrailers";
import FullScreenTrailer from "./FullScreenTrailer";

const MovieCard = ({ posterPath, movieId, title, overview, releaseDate }) => {
  const [isHovered, setIsHovered] = useState(false); // Control card expansion
  const [showVideo, setShowVideo] = useState(false); // Control preview trailer playback
  const [hoverTimer, setHoverTimer] = useState(null); // Store hover timer
  const [showFullScreen, setShowFullScreen] = useState(false); // Fullscreen trailer toggle
  const { trailerKey, fetchTrailer } = useMovieTrailers(movieId); // Fetch trailer for the movie
  const iframeRef = useRef(null);

  // Handle hover to trigger card expansion and trailer preview
  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      setIsHovered(true); // Expand the card
      fetchTrailer(); // Fetch the trailer key
    }, 800); // 800ms delay
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowVideo(false);
    if (hoverTimer) {
      clearTimeout(hoverTimer); // Clear hover timer
      setHoverTimer(null);
    }
  };

  // Play the preview trailer in the expanded card
  useEffect(() => {
    if (isHovered && trailerKey) {
      setTimeout(() => setShowVideo(true), 100); // Slight delay for smoother transition
    } else {
      setShowVideo(false);
    }
  }, [isHovered, trailerKey]);

  // Pass the trailer key to iframe only when ready
  useEffect(() => {
    if (showVideo && trailerKey && iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playsinline=1&playlist=${trailerKey}`;
    }
  }, [showVideo, trailerKey]);

  // Handle click on the expanded card to open fullscreen trailer
  const handleCardClick = () => {
    if (trailerKey) setShowFullScreen(true);
  };

  if (!posterPath) return null;

  return (
    <>
      <div
        className={`w-36 cursor-pointer md:w-48 pr-4 relative transition-transform ${
          isHovered ? "scale-110 z-50" : ""
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        {/* Movie Poster */}
        <img
          src={IMG_CDN_URL + posterPath}
          alt={`${title} poster`}
          className="rounded-lg w-full h-full object-cover"
        />
        {/* Expanded Card with Preview Trailer */}
        {isHovered && (
          <div className="absolute -top-8 -left-8 w-[calc(100%+56px)] bg-zinc-800 rounded-lg z-50 shadow-lg overflow-hidden">
            <div className="w-full h-[168px] relative overflow-hidden">
              {showVideo && (
                <iframe
                  ref={iframeRef}
                  className="aspect-video w-full h-full"
                  title={`${title} trailer`}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              )}
            </div>
            <div className="p-4">
              <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
              <p className="text-white text-xs mb-2">{releaseDate}</p>
              <p className="text-white text-sm overflow-hidden line-clamp-2">
                {overview}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Fullscreen Trailer */}
      {showFullScreen && (
        <FullScreenTrailer
          trailerKey={trailerKey}
          onClose={() => setShowFullScreen(false)}
        />
      )}
    </>
  );
};

export default MovieCard;
