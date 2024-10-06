import { useState } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import useMovieTrailers from "../hooks/useMovieTrailers";

const MovieCard = ({ posterPath, movieId, title, overview, releaseDate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { trailerKey, fetchTrailer } = useMovieTrailers(movieId);

  const handleMouseEnter = () => {
    setIsHovered(true);
    fetchTrailer();
  };

  if (!posterPath) return null;

  return (
    <div
      className="w-36 md:w-48 pr-4 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        alt={`${title} poster`}
        className="rounded-lg w-full h-full object-cover"
        src={IMG_CDN_URL + posterPath}
      />
      {isHovered && (
        <div className="absolute top-0 left-0 w-[300px] h-[550px] bg-zinc-800 rounded-lg p-4 flex flex-col justify-between z-50 shadow-lg">
          {trailerKey && (
            <div className="mt-4">
              <iframe
                className="w-full h-40 rounded-lg"
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1`}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={`${title} trailer`}
              />
            </div>
          )}
          <div>
            <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
            <p className="text-white text-xs mb-2">{releaseDate}</p>
            <p className="text-white text-sm overflow-hidden line-clamp-3">
              {overview}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
