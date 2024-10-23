/* eslint-disable react/prop-types */
import { GoDotFill } from "react-icons/go";
import { FaStar, FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Button from "../Button";
import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../context";
import noimage from "../../assets/images/no_image.png";

const MovieCard = ({
  movie,
  id,
  image,
  overview,
  title,
  released,
  voteAverage,
  voteCount,
}) => {
  const { addToFavorites, removeFromFavorites, favoriteMovies } =
    useGlobalContext();

  const { pathname } = useLocation();

  // CHECK IF MOVIE HAS BEEN ADDED TO FAVORITES LIST
  const isFavorite = favoriteMovies.find((movie) => movie.id === id);

  return (
    <div className="w-full rounded-lg">
      <div className="relative">
        {image === null ? (
          <img
            src={noimage}
            alt="no image"
            className="min-h-[360px] object-contain"
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original/${image}`}
            alt={title}
            className="rounded-lg min-h-[360px] object-cover"
          />
        )}
        <div className="opacity-0 hover:opacity-100 duration-700 ease-in-out absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] rounded-lg flex flex-col gap-2 justify-center items-center text-white">
          <p className="font-montserrat text-xs w-[90%] text-center">
            {`${overview.slice(0, 200)} ${
              overview.length > 200 ? ". . ." : ""
            }`}
          </p>

          <Link
            to={pathname.includes("show") ? `/show/${id}` : `/${id}`}
            relative="path"
            className="cursor-pointer">
            <Button text="Details" />
          </Link>

          {isFavorite ? (
            <MdDelete
              className={`text-2xl fixed top-5 right-5 cursor-pointer hover:text-red-700`}
              onClick={() => removeFromFavorites(movie)}
            />
          ) : (
            <FaHeart
              className={`text-2xl fixed top-5 right-5 cursor-pointer hover:text-[#90cea1] ${
                isFavorite ? "text-[#90cea1]" : ""
              }`}
              onClick={() => addToFavorites(movie)}
            />
          )}
        </div>
      </div>

      <div className="mt-2 tracking-wide">
        <h2 className="font-montserrat font-medium text-lg leading-5 mb-1">
          {title}
        </h2>
        <div>
          <p className="font-montserrat font-normal leading-normal text-sm">
            Release Date: {released}
          </p>
          <p className="font-montserrat font-normal leading-normal flex justify-start items-center gap-2 text-sm">
            <FaStar className="text-yellow-400" />
            {voteAverage.toFixed(2)}
            <GoDotFill className="text-xs" />
            <span>({voteCount} Votes)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
