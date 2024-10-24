import { NavLink, Outlet, useLoaderData, useParams } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import Button from "../../components/Button";
import Recommendations from "./Recommendations";
import { useGlobalContext } from "../../context";
import { fetchMovie, fetchMovieRecommendations } from "../../utils/api";
import useScrollToTop from "../../Hooks/useScrollToTop";

export const loader = async ({ params }) => {
  const { id } = params;
  const [movie, recommendations] = await Promise.all([
    fetchMovie(id),
    fetchMovieRecommendations(id),
  ]);
  return {
    movie: movie,
    recommendations: recommendations.results,
  };
};

const Movie = () => {
  const { movie, recommendations } = useLoaderData();
  const { id } = useParams();
  const { addToFavorites, removeFromFavorites, favoriteMovies } =
    useGlobalContext();
  useScrollToTop(id);

  // CHECK IF MOVIE HAS BEEN ADDED TO FAVORITES LIST
  const isFavorite = favoriteMovies.find(
    (favMovie) => favMovie.id === movie.id
  );

  const backgroundImage = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <main className="mb-16">
      <section className="relative">
        <div
          style={backgroundImage}
          className="small-screen-padding top-0 left-0 right-0 bottom-0 pt-24 pb-10 w-full h-min bg-blend-overlay bg-[rgba(0,0,0,0.5)]">
          <div className="max-container grid grid-cols-1 auto-rows-min gap-2 md:grid-cols-5 md:items-center md:gap-8">
            <div className="grid place-items-center md:col-span-2">
              <img
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg"
              />
            </div>

            <div className="md:col-span-3 self-center">
              {movie && (
                <div className="font-montserrat tracking-wide mb-3 text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-2 ">
                    {movie.title}
                  </h1>
                  <p className="font-light text-lg md:my-2 xl:text-xl leading-normal w-[80%] ">
                    {movie.tagline}
                  </p>
                  <p className="font-light leading-normal flex justify-start items-center gap-2 text-sm xl:text-base mb-4">
                    <FaStar className="text-yellow-400 xl:text-sm" />
                    <FaStar className="text-yellow-400 xl:text-sm" />
                    <FaStar className="text-yellow-400 xl:text-sm" />
                    {movie.vote_average
                      ? movie.vote_average.toFixed(2)
                      : "No rating available"}
                    <GoDotFill className="text-xs" />
                    <span>({movie.vote_count || 0} Votes)</span>
                  </p>
                  {isFavorite ? (
                    <div
                      className="border-transparent"
                      onClick={() => removeFromFavorites(movie)}>
                      <Button text={"Remove from Favorites"} />
                    </div>
                  ) : (
                    <div onClick={() => addToFavorites(movie)}>
                      <Button text={"Add to Favorites"} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="small-screen-padding mt-6">
        <div className="max-container">
          <nav className="text-black text-xs xl:text-base tracking-wider font-montserrat flex flex-wrap gap-2 mb-4">
            <NavLink
              to="."
              end
              className={({ isActive }) =>
                isActive
                  ? "border border-opacity-50 border-[#01b4e4] theme-gradient-text px-2 py-2"
                  : "border px-2 py-2 hover:theme-gradient-text hover:border-[#01b4e4]"
              }>
              Overview
            </NavLink>
            <NavLink
              to="details"
              className={({ isActive }) =>
                isActive
                  ? "border border-opacity-50 border-[#01b4e4] theme-gradient-text px-2 py-2"
                  : "border px-2 py-2 hover:theme-gradient-text hover:border-[#01b4e4]"
              }>
              Details
            </NavLink>
            <NavLink
              to="trailer"
              className={({ isActive }) =>
                isActive
                  ? "border border-opacity-50 border-[#01b4e4] theme-gradient-text px-2 py-2"
                  : "border px-2 py-2 hover:theme-gradient-text hover:border-[#01b4e4]"
              }>
              Trailer
            </NavLink>
            <NavLink
              to="cast"
              className={({ isActive }) =>
                isActive
                  ? "border border-opacity-50 border-[#01b4e4] theme-gradient-text px-2 py-2"
                  : "border px-2 py-2 hover:theme-gradient-text hover:border-[#01b4e4]"
              }>
              Cast
            </NavLink>
            <NavLink
              to="reviews"
              className={({ isActive }) =>
                isActive
                  ? "border border-opacity-50 border-[#01b4e4] theme-gradient-text px-2 py-2"
                  : "border px-2 py-2 hover:theme-gradient-text hover:border-[#01b4e4]"
              }>
              Reviews
            </NavLink>
          </nav>

          {/* OUTLET FOR OVERVIEW, CAST, TRAILER, DETAILS AND REVIEWS COMPONENTS */}
          <Outlet context={{ movie }} />

          <div className="mt-4 font-montserrat font-normal italic leading-normal text-sm md:w-[80%] md:text-base text-black tracking-wide">
            {movie.imdb_id && movie.homepage ? (
              <p>
                Find out more about {movie.title} on{" "}
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}/`}
                  className="text-light-blue">
                  IMDB
                </a>
                , or visit the official movie homepage{" "}
                <a href={movie.homepage} className="text-light-blue">
                  here
                </a>
              </p>
            ) : (
              <p>
                Find out more about {movie.title} on{" "}
                <a
                  href={`https://www.imdb.com/title/${movie.imdb_id}/`}
                  className="text-light-blue">
                  IMDB
                </a>
              </p>
            )}
          </div>

          <Recommendations recommendations={recommendations} />
        </div>
      </section>
    </main>
  );
};

export default Movie;
