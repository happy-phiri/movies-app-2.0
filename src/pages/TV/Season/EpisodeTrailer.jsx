import { useParams, useOutletContext, useLoaderData } from "react-router-dom";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import { fetchEpisodeTrailer } from "../../../utils/api";

export const loader = async ({ params }) => {
  const { id, seasonNumber, episodeNumber } = params;
  return fetchEpisodeTrailer(id, seasonNumber, episodeNumber);
};

const EpisodeTrailer = () => {
  const data = useLoaderData();
  const { episodeNumber, seasonNumber } = useParams();
  let trailer;
  const { show } = useOutletContext();
  useDocumentTitle(
    trailer
      ? `Trailer | ${show.name} | Season ${seasonNumber} | Episode ${episodeNumber}`
      : `${show.name} | Season ${seasonNumber} | Episode ${episodeNumber}`
  );

  if (data.results.length === 1) {
    trailer = data.results[0];
  } else {
    trailer = data.results.find(
      (item) =>
        item.type === "Trailer" ||
        item.name.includes("Official") ||
        item.name.includes("Trailer")
    );
  }

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

export default EpisodeTrailer;
