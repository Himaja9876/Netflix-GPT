import { useSelector } from 'react-redux';
import useMovieTrailer from '../hooks/useMovieTrailer';

export const VideoBackground = () => {

  const trailerdetails = useSelector((store) => store.movies.addTrailerVideo);
  //console.log(trailerdetails);
  useMovieTrailer();
  return (
    <div>
      <iframe 
      width="560" 
      height="315" 
      src={
        trailerdetails && trailerdetails.length > 0
          ? `https://www.youtube.com/embed/${trailerdetails[0].key}`
          : ''
      }
      title="YouTube video player" 
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      referrerPolicy="strict-origin-when-cross-origin" 
      allowFullScreen></iframe>
    </div>
  )
}

