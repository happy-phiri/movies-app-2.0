/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import noImage from "../assets/images/no-image.svg";

const SeasonCard = ({
  image,
  name,
  episodes,
  aired,
  voteAverage,
  seasonNumber,
}) => {
  const { id } = useParams();

  return (
    <div className="w-full rounded-t-lg shadow-md shadow-slate-300 rounded-b-md hover:shadow-lg">
      <Link to={`/shows/${id}/seasons/${seasonNumber}`}>
        <div>
          {image === null ? (
            <img
              src={noImage}
              alt="no image"
              className="min-h-[360px] object-contain"
            />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/original/${image}`}
              alt={name}
              className="rounded-t-lg min-h-[360px] object-cover"
            />
          )}
        </div>

        <div className="mt-2 tracking-wide  px-3 py-2">
          <h2 className="font-montserrat font-medium text-lg leading-5 mb-1">
            {name}
          </h2>
          <div className="font-montserrat font-normal leading-normal text-sm">
            <p>
              Aired on: <span className="italic">{aired}</span>
            </p>
            <p>Episodes: {episodes}</p>
            <p className=" flex justify-start items-center gap-2">
              <span className="flex flex-row flex-nowrap gap-1">
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
                <FaStar className="text-yellow-400" />
              </span>

              {voteAverage.toFixed(2)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SeasonCard;
