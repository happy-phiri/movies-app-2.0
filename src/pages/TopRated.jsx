import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import useDocumentTitle from "../Hooks/useDocumentTitle";
import { useSearchParams } from "react-router-dom";

const TopRated = () => {
  const [loading, setLoading] = useState(false);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  useDocumentTitle("Movies | Top Rated");

  const fetchTopRatedMovies = async (page) => {
    const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNDkyMzMyMy41OTE0MjgsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHErdJsQNMVwzlYgQXixTuN0pgmYTd6Uo_ElbeYKxwM",
      },
    };

    try {
      setLoading(true);
      await fetch(topRatedMoviesUrl, options)
        .then((res) => res.json())
        .then((data) => {
          setTopRatedMovies(data.results);
          setTotalPages(data.total_pages);
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleNextPage = () => {
    // setPage((prevState) => prevState + 1);
    setSearchParams({ page: page + 1 });
  };

  const handlePrevPage = () => {
    // setPage((prevState) => prevState - 1);
    setSearchParams({ page: page - 1 });
  };

  useEffect(() => {
    fetchTopRatedMovies(page);
  }, [page]);

  return (
    <div className="max-container small-screen-padding pt-28">
      {loading ? (
        <h1 className="text-xl font-montserrat small-screen-padding top-0 left-0 min-h-dvh">
          Loading . . .
        </h1>
      ) : (
        <section>
          <h1 className="font-montserrat text-2xl lg:text-4xl mb-4">
            Top Rated Movies of All Time
          </h1>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-7">
            {topRatedMovies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  id={movie.id}
                  image={movie.poster_path}
                  title={movie.title}
                  released={movie.release_date}
                  voteAverage={movie.vote_average}
                  voteCount={movie.vote_count}
                  overview={movie.overview}
                />
              );
            })}
          </div>
          <div className="text-center font-montserrat border-t border-gray-300 pt-5">
            <p>
              Page {page} of {totalPages}
            </p>
            <div className="flex justify-center items-center gap-7 mt-2">
              {page > 1 && (
                <button
                  onClick={handlePrevPage}
                  className="text-2xl hover:text-light-green">
                  <GrLinkPrevious />
                </button>
              )}
              {page < totalPages && (
                <button
                  onClick={handleNextPage}
                  className="text-2xl hover:text-light-green">
                  <GrLinkNext />
                </button>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default TopRated;
