/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import noImage from "../assets/images/no-image.svg";

const EpisodeCard = ({
  image,
  name,
  episodeNumber,
  aired,
  voteAverage,
  voteCount,
  runtime,
  seasonNumber,
}) => {
  const { id } = useParams();

  return (
    <div className="w-full rounded-t-lg shadow-md shadow-slate-300 rounded-b-md hover:shadow-lg">
      <Link to={`/shows/${id}/seasons/${seasonNumber}/${episodeNumber}`}>
        <div>
          {image === null ? (
            <img
              src={noImage}
              alt="no image"
              className="max-w-[60%] object-cover mx-auto"
            />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/original/${image}`}
              alt={name}
              className="rounded-t-lg  object-cover"
            />
          )}
        </div>

        <div className="mt-2 font-montserrat tracking-wide px-3 py-2">
          <h2 className="font-medium text-lg leading-5 mb-1">{name}</h2>
          <div className="font-normal leading-normal text-sm">
            <p>
              Episode: <span className="font-light">{episodeNumber}</span>
            </p>
            <p>
              Runtime: <span className="font-light">{runtime} minutes</span>
            </p>
            <p>
              Aired on: <span className="font-light">{aired}</span>
            </p>
            <p className="font-normal leading-normal flex justify-start items-center gap-2 text-sm">
              <FaStar className="text-yellow-400" />
              {voteAverage.toFixed(2)}
              <GoDotFill className="text-xs" />
              <span>({voteCount} Votes)</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EpisodeCard;
