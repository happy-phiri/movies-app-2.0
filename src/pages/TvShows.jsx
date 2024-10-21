import { useState, useEffect } from "react";
import ShowCard from "../components/ShowCard";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import useDocumentTitle from "../Hooks/useDocumentTitle";
import { useSearchParams } from "react-router-dom";

const TvShows = () => {
  const [loading, setLoading] = useState(false);
  const [tvShows, setTvShows] = useState([]);
  const [totalPages, setTotalPages] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  useDocumentTitle("TV Shows and Series | Top Rated");

  const fetchTvShows = async (page) => {
    const popularTvShowsUrl = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNDkyMzMyMy41OTE0MjgsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHErdJsQNMVwzlYgQXixTuN0pgmYTd6Uo_ElbeYKxwM",
      },
    };

    setLoading(true);
    const res = await fetch(popularTvShowsUrl, options);
    if (!res) {
      throw {
        message: res.status_message,
        status: res.status_code,
      };
    }
    const data = await res.json();
    setTvShows(data.results);
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
    fetchTvShows(page);
  }, [page]);

  return (
    <div className="max-container small-screen-padding pt-28 mb-16">
      {loading ? (
        <p className="text-xl font-normal font-montserrat small-screen-padding top-0 left-0 min-h-dvh">
          Loading . . .
        </p>
      ) : (
        <section>
          <h1 className="font-montserrat text-2xl lg:text-4xl mb-4">
            Popular TV Shows
          </h1>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-7">
            {tvShows.map((show) => {
              return (
                <ShowCard
                  key={show.id}
                  movie={show}
                  id={show.id}
                  image={show.poster_path}
                  title={show.name}
                  released={show.first_air_date}
                  voteAverage={show.vote_average}
                  voteCount={show.vote_count}
                  overview={show.overview}
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

export default TvShows;
