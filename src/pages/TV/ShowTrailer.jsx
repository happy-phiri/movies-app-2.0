import { useOutletContext, useLoaderData } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import { fetchTvShowTrailer } from "../../utils/api";

export const loader = async ({ params }) => {
  const { id } = params;
  return fetchTvShowTrailer(id);
};

const ShowTrailer = () => {
  const data = useLoaderData();
  let trailer;
  if (data.results.length > 1) {
    trailer = data.results.find(
      (item) =>
        item.type === "trailer" ||
        item.type === "clip" ||
        item.name.includes("Official") ||
        item.name.includes("Trailer")
    );
  } else if (data.results.length === 1) {
    trailer = data.results[0];
  } else {
    trailer = null;
  }

  const { show } = useOutletContext();
  useDocumentTitle(`Trailer | ${show.name}`);

  if (trailer) {
    return (
      <div className="relative overflow-hidden w-full pt-[56.25%]">
        <iframe
          className=" absolute top-0 left-0 right-0 bottom-0 h-full w-full rounded-lg"
          title={trailer.name}
          src={`https://www.youtube.com/embed/${trailer.key}`}></iframe>
      </div>
    );
  } else {
    return (
      <p className="text-base font-montserrat font-light tracking-wide text-black">
        Sorry, trailer not found
      </p>
    );
  }
};

export default ShowTrailer;
