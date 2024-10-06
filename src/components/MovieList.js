import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  //console.log(movies);
  return (
    <div className="px-6 ">
      <h1 className="text-lg md:text-xl py-3 mt-5 text-white">{title}</h1>
      <div className="flex overflow-x-scroll">
        <div className="flex">
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
