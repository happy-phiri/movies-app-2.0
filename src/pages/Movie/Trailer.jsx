import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

const Trailer = () => {
  const { id } = useParams();
  const [trailer, setTrailer] = useState("");
  const [loading, setLoading] = useState(false);
  const { movie } = useOutletContext();
  useDocumentTitle(`${movie.title} | Trailer`);

  const fetchTrailer = async () => {
    const trailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNDkyMzMyMy41OTE0MjgsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHErdJsQNMVwzlYgQXixTuN0pgmYTd6Uo_ElbeYKxwM",
      },
    };

    setLoading(true);
    const res = await fetch(trailerUrl, options);
    if (!res) {
      throw {
        message: res.status_message,
        status: res.status_code,
      };
    }
    const data = await res.json();
    setTrailer(
      data.results.find(
        (item) =>
          item.type === "Trailer" || item.name.includes("Official Trailer")
      )
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchTrailer();
  }, []);

  if (loading) {
    return (
      <section>
        <h1 className="text-xl font-montserrat">Loading . . .</h1>
      </section>
    );
  } else if (trailer) {
    return (
      <div className="relative overflow-hidden w-full pt-[56.25%]">
        <iframe
          className=" absolute top-0 left-0 right-0 bottom-0 h-full w-full rounded-lg"
          title={trailer.name}
          src={`https://www.youtube.com/embed/${trailer.key}`}></iframe>
      </div>
    );
  } else {
    <h1 className="text-3xl font-montserrat text-black">Trailer not found</h1>;
  }
};

export default Trailer;
