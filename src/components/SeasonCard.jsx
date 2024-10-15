/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";

const SeasonCard = ({
  image,
  overview,
  name,
  episodes,
  aired,
  voteAverage,
}) => {
  return (
    <div className="w-full rounded-t-lg shadow-md shadow-slate-300 rounded-b-md hover:shadow-lg">
      <div className="relative">
        {image === null ? (
          <img
            src="/src/assets/images/no-image.svg"
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
        {overview && (
          <div className="opacity-0 hover:opacity-100 duration-700 ease-in-out absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] rounded-lg flex flex-col gap-2 justify-center items-center text-white">
            <p className="font-montserrat text-xs w-[90%] text-center">
              {overview}
            </p>
          </div>
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
    </div>
  );
};

export default SeasonCard;
