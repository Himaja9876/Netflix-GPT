// MovieCard.js
import { useState } from "react";
import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ posterPath, movieId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const trailerKey = useSelector(
    (store) => store.trailers.trailerKeys[movieId]
  );

  if (!posterPath) return null;

  return (
    <div
      className="w-36 md:w-48 pr-4 opacity-90 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        alt="Movie Card"
        className="rounded-md"
        src={IMG_CDN_URL + posterPath}
      />
      {isHovered && trailerKey && (
        <div className="absolute inset-0">
          <iframe
            className="w-full h-full rounded-md"
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1`}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default MovieCard;
