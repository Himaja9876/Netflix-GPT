import { useState, useRef, useEffect } from "react";
import { IMG_CDN_URL } from "../utils/constants";
import useMovieTrailers from "../hooks/useMovieTrailers";

const MovieCard = ({ posterPath, movieId, title, overview, releaseDate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const { trailerKey, fetchTrailer } = useMovieTrailers(movieId);
  const iframeRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    fetchTrailer();
  };

  useEffect(() => {
    let timer;
    if (isHovered && trailerKey) {
      timer = setTimeout(() => {
        setShowVideo(true);
      }, 100); // Delay showing video by 100ms
    } else {
      setShowVideo(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered, trailerKey]);

  useEffect(() => {
    if (showVideo && trailerKey && iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&showinfo=0&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1&playlist=${trailerKey}`;
    }
  }, [showVideo, trailerKey]);

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
        <div className="absolute -top-8 -left-8 w-[calc(100%+56px)] h-[calc(100%+16px)] bg-zinc-800 rounded-lg z-50 shadow-lg transform scale-110 overflow-hidden">
          <div className="w-full h-[168px] relative overflow-hidden">
            {showVideo && (
              <iframe
                ref={iframeRef}
                className="aspect-video top-1/2 left-1/2 h-[110%] scale-150"
                title={`${title} trailer`}
                frameborder="0"
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
      <style jsx>{`
        iframe {
          pointer-events: none;
          width: 100%;
          height: 100%;
          border: none;
        }
        iframe::-webkit-scrollbar {
          display: none;
        }
        iframe {
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MovieCard;
