import { useOutletContext } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

const ShowOverview = () => {
  const { show } = useOutletContext();
  useDocumentTitle(`Overview | ${show.name}`);
  return (
    <div>
      <p className="font-montserrat font-light leading-normal text-sm md:w-[80%] md:text-base text-black tracking-wide">
        {show.overview}
      </p>
    </div>
  );
};

export default ShowOverview;
