import { useOutletContext } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

const Overview = () => {
  const { movie } = useOutletContext();
  useDocumentTitle(`${movie.title} | Overview`);
  return (
    <div>
      <p className="font-montserrat font-light leading-normal text-sm md:w-[80%] md:text-base text-black tracking-wide">
        {movie.overview}
      </p>
    </div>
  );
};

export default Overview;
