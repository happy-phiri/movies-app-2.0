import { useState, useEffect } from "react";
import { useGlobalContext } from "../context";
import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import Button from "./Button";
import { Link } from "react-router-dom";
import Favorites from "./Favorites";

const Hero = () => {
  const { loading, playingMovies, favoriteMovies } = useGlobalContext();
  const [randomMovieIndex, setRandomMovieIndex] = useState(null);

  // GET A RANDOM MOVIE INDEX FROM THE LIST OF NOW PLAYING MOVIES TO SHOW ON THE HERO SECTION
  useEffect(() => {
    if (!loading && playingMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * playingMovies.length);
      setRandomMovieIndex(randomIndex); // Set the random movie once
    }
  }, [loading, playingMovies]); // Runs only when loading or playingMovies changes

  if (!loading && playingMovies.length > 0 && randomMovieIndex !== null) {
    const randomMovie = playingMovies[randomMovieIndex];

    const backgroundImage = {
      backgroundImage: `url(https://image.tmdb.org/t/p/original/${randomMovie.backdrop_path})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      // backgroundAttachment: "fixed",
    };

    return (
      <section
        className="small-screen-padding top-0 left-0 right-0 bottom-0 pt-24 pb-10 w-full h-min bg-blend-overlay bg-[rgba(0,0,0,0.60)]"
        style={backgroundImage}>
        <div className="max-container grid grid-cols-1 auto-rows-min gap-2 md:grid-cols-5 md:items-center md:gap-8">
          <div className="grid place-items-center md:col-span-2">
            {/* HERO IMAGE */}
            <img
              src={`https://image.tmdb.org/t/p/original/${randomMovie.poster_path}`}
              alt={randomMovie.title}
              className="rounded-lg md:w-[90%] place-self-start"
            />
          </div>

          {/* HERO TEXT DESCRIPTION */}
          <div className="md:col-span-3 self-center place-self-start font-montserrat text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl my-2 tracking-wider drop-shadow-lg shadow-black">
              {randomMovie.title}
            </h1>

            <p className="font-light leading-normal flex justify-start items-center gap-2 text-sm xl:text-base tracking-wide ">
              <span className="flex flex-row flex-nowrap gap-2 items-center">
                <FaStar className="text-yellow-400 xl:text-sm" />
                <FaStar className="text-yellow-400 xl:text-sm" />
                <FaStar className="text-yellow-400 xl:text-sm" />
                {randomMovie.vote_average.toFixed(2)}
              </span>
              <GoDotFill className="text-xs" />

              <span>({randomMovie.vote_count} Votes)</span>

              <GoDotFill className="text-xs" />

              <span className="font-light text-sm lg:text-base">
                {randomMovie.release_date}
              </span>
            </p>

            <p className="font-light text-sm tracking-wide my-4 md:w-[90%] lg:text-base">
              {randomMovie.overview}
            </p>

            <div className="flex gap-3 items-center mt-4">
              <Link to={`${randomMovie.id}`}>
                <Button text="Find Out More" />
              </Link>
            </div>
          </div>
        </div>
        {favoriteMovies.length > 0 && (
          <div className="max-container">
            <Favorites />
          </div>
        )}
      </section>
    );
  } else {
    return (
      <section className="max-container">
        <p className="text-xl font-montserrat small-screen-padding top-0 left-0 pt-24 min-h-dvh">
          Loading . . .
        </p>
      </section>
    );
  }
};

export default Hero;
