import { useEffect, useState } from "react";
import { useParams, NavLink, Outlet } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import Button from "../../components/Button";
import Similar from "./Similar";
import { useGlobalContext } from "../../context";

const Show = () => {
  const { id } = useParams();
  const [show, setShow] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToFavorites, removeFromFavorites, favoriteMovies } =
    useGlobalContext();

  // CHECK IF MOVIE HAS BEEN ADDED TO FAVORITES LIST
  const isFavorite = favoriteMovies.find((favMovie) => favMovie.id === show.id);

  useEffect(() => {
    const fetchShow = async () => {
      const movieUrl = `https://api.themoviedb.org/3/tv/${id}`;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNDkyMzMyMy41OTE0MjgsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHErdJsQNMVwzlYgQXixTuN0pgmYTd6Uo_ElbeYKxwM",
        },
      };

      const res = await fetch(movieUrl, options);
      if (!res) {
        throw {
          message: res.status_message,
          status: res.status_code,
        };
      }
      const data = await res.json();
      setShow(data);
      setLoading(false);
    };

    fetchShow();
  }, [id]);

  const backgroundImage = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${show.backdrop_path})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  if (loading) {
    return (
      <section className="max-container mb-16">
        <p className="text-xl font-montserrat small-screen-padding top-0 left-0 pt-24 min-h-dvh">
          Loading . . .
        </p>
      </section>
    );
  } else {
    return (
      <main className="pb-6 mb-16">
        <section className="relative">
          <div
            style={backgroundImage}
            className="small-screen-padding top-0 left-0 right-0 bottom-0 pt-24 pb-10 w-full h-min bg-blend-overlay bg-[rgba(0,0,0,0.5)]">
            <div className="max-container grid grid-cols-1 auto-rows-min gap-2 md:grid-cols-5 md:items-center md:gap-8">
              <div className="grid place-items-center md:col-span-2">
                <img
                  src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
                  alt={show.name}
                  className="rounded-lg"
                />
              </div>

              <div className="md:col-span-3 self-center">
                {show && (
                  <div className="font-montserrat mb-3 text-white tracking-wide">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl mt-2">
                      {show.name}
                    </h1>
                    <p className="font-light text-lg md:my-2 xl:text-xl leading-normal w-[80%] tracking-wide">
                      {show.tagline}
                    </p>
                    <p className="font-light leading-normal flex justify-start items-center gap-2 text-sm xl:text-base mb-4">
                      <FaStar className="text-yellow-400 xl:text-sm" />
                      <FaStar className="text-yellow-400 xl:text-sm" />
                      <FaStar className="text-yellow-400 xl:text-sm" />
                      {show.vote_average.toFixed(2)}
                      <GoDotFill className="text-xs" />
                      <span>({show.vote_count} Votes)</span>
                    </p>
                    {isFavorite ? (
                      <div
                        className="border-transparent"
                        onClick={() => removeFromFavorites(show)}>
                        <Button text={"Remove from Favorites"} />
                      </div>
                    ) : (
                      <div onClick={() => addToFavorites(show)}>
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
                to="seasons"
                className={({ isActive }) =>
                  isActive
                    ? "border border-opacity-50 border-[#01b4e4] theme-gradient-text px-2 py-2"
                    : "border px-2 py-2 hover:theme-gradient-text hover:border-[#01b4e4]"
                }>
                Seasons
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
            <Outlet context={{ show }} />

            <div className="mt-4">
              {show.homepage && (
                <p className="font-montserrat font-normal italic leading-normal text-sm md:w-[80%] md:text-base text-black tracking-wide">
                  Visit the official {show.name} homepage{" "}
                  <a href={show.homepage} className="text-light-blue">
                    here
                  </a>
                </p>
              )}
            </div>

            <Similar />
          </div>
        </section>
      </main>
    );
  }
};

export default Show;
