import MovieCard from "../components/cards/MovieCard";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import useDocumentTitle from "../Hooks/useDocumentTitle";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { fetchTopRatedMovies } from "../utils/api";
import useScrollToTop from "../Hooks/useScrollToTop";

export const loader = ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  return fetchTopRatedMovies(page);
};

const TopRated = () => {
  const data = useLoaderData();
  const topRatedMovies = data.results;
  const totalPages = data.total_pages;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  useDocumentTitle("Movies | Top Rated");
  useScrollToTop(page);

  const handleNextPage = () => {
    setSearchParams({ page: page + 1 });
  };

  const handlePrevPage = () => {
    setSearchParams({ page: page - 1 });
  };

  return (
    <div className="max-container small-screen-padding pt-28 mb-16">
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
    </div>
  );
};

export default TopRated;
