/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import noImage from "../../assets/images/no-image.svg";

const CharacterCard = ({ id, image, name, character }) => {
  return (
    <div className="font-montserrat w-[140px] p-2 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
      <Link to={`/actors/${id}`} className="block">
        {image === null ? (
          <img
            src={noImage}
            alt="no image"
            className="object-cover w-[100px] h-[100px] rounded-full mx-auto mb-2"
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original/${image}`}
            alt={name}
            className="object-cover w-[100px] h-[100px] rounded-full mx-auto mb-2"
          />
        )}
        <div className="text-center mt-1">
          <p className="font-medium text-xs text-gray-800">{name}</p>
          {character && <p className="text-xs text-gray-500">as {character}</p>}
        </div>
      </Link>
    </div>
  );
};

export default CharacterCard;
