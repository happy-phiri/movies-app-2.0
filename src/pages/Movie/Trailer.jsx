import { useLoaderData } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import { fetchMovieTrailer, fetchMovie } from "../../utils/api";

export const loader = async ({ params }) => {
  const { id } = params;
  const [movie, trailer] = await Promise.all([
    fetchMovie(id),
    fetchMovieTrailer(id),
  ]);
  return {
    movie: movie,
    trailer: trailer.results.find(
      (item) =>
        item.type === "Trailer" || item.name.includes("Official Trailer")
    ),
  };
};

const Trailer = () => {
  const { movie, trailer } = useLoaderData();

  useDocumentTitle(`${movie.title} | Trailer`);

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
    <p className="text-xl tracking-wide font-montserrat text-black">
      Trailer not found
    </p>;
  }
};

export default Trailer;
