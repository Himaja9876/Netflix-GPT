import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

export const VideoBackground = ({ movieId }) => {
  const trailerdetails = useSelector((store) => store.movies.addTrailerVideo);
  //console.log(trailerdetails);
  useMovieTrailer(movieId);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <iframe
        className="aspect-video top-1/2 left-1/2 h-[110%] scale-150"
        src={
          trailerdetails && trailerdetails.key
            ? `https://www.youtube.com/embed/${trailerdetails.key}?autoplay=1&mute=1&modestbranding=1&controls=0&loop=1&playlist=${trailerdetails.key}`
            : ""
        }
        title="YouTube video player"
        allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
};
