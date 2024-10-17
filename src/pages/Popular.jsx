import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import useDocumentTitle from "../Hooks/useDocumentTitle";
import { useSearchParams } from "react-router-dom";

const Popular = () => {
  const [loading, setLoading] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState("");
  useDocumentTitle("Movies | Popular");

  const fetchPopularMovies = async (page) => {
    const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNDkyMzMyMy41OTE0MjgsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHErdJsQNMVwzlYgQXixTuN0pgmYTd6Uo_ElbeYKxwM",
      },
    };

    setLoading(true);
    const res = await fetch(popularMoviesUrl, options);
    if (!res) {
      throw {
        message: res.status_message,
        status: res.status_code,
      };
    }
    const data = await res.json();
    setPopularMovies(data.results);
    setTotalPages(data.total_pages);
    setLoading(false);
  };

  const handleNextPage = () => {
    setSearchParams({ page: page + 1 });
  };

  const handlePrevPage = () => {
    setSearchParams({ page: page - 1 });
  };

  useEffect(() => {
    fetchPopularMovies(page);
  }, [page]);

  return (
    <main className="max-container small-screen-padding pt-28 mb-16">
      {loading ? (
        <p className="text-2xl font-normal font-montserrat small-screen-padding top-0 left-0 min-h-dvh">
          Loading . . .
        </p>
      ) : (
        <section>
          <h1 className="font-montserrat text-2xl lg:text-4xl mb-4">
            Popular Movies
          </h1>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-7">
            {popularMovies.map((movie) => {
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
    </main>
  );
};

export default Popular;
