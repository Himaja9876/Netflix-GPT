import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6">
      {/* Title */}
      <h1 className="text-lg md:text-xl py-2 mt-0 md:py-3 md:mt-5 text-white">
        {title}
      </h1>
      {/* Horizontal Scrollable Container */}
      <div className="flex overflow-x-scroll scrollbar-hide relative">
        {/* Movie Cards Container */}
        <div className="flex overflow-visible">
          {movies?.map((movie) => (
            <MovieCard
              key={movie.id}
              posterPath={movie.poster_path}
              movieId={movie.id}
              title={movie.title || movie.name}
              overview={movie.overview}
              releaseDate={movie.release_date}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
