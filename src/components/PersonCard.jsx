/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import noImage from "../assets/images/no-image.svg";

const PersonCard = ({ id, image, name }) => {
  return (
    <div className=" cursor-pointer shadow-md shadow-slate-300 rounded-b-md hover:shadow-lg">
      <Link to={`/actors/${id}`}>
        {image ? (
          <img
            src={`https://image.tmdb.org/t/p/original/${image}`}
            alt={name}
            className="rounded-t-md max-md:w-[320px]"
          />
        ) : (
          <img
            src={noImage}
            alt="no image"
            className="min-h-[360px] object-contain"
          />
        )}

        <p className="text-center px-2 py-3">{name}</p>
      </Link>
    </div>
  );
};

export default PersonCard;
