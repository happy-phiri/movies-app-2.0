import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

const Trailer = () => {
  const { id } = useParams();
  const [trailer, setTrailer] = useState("");
  const [loading, setLoading] = useState(false);
  const { movie } = useOutletContext();
  useDocumentTitle(`${movie.title} | Trailer`);

  const trailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNDkyMzMyMy41OTE0MjgsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHErdJsQNMVwzlYgQXixTuN0pgmYTd6Uo_ElbeYKxwM",
    },
  };

  const fetchTrailer = async (url) => {
    try {
      setLoading(true);
      await fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          setTrailer(
            data.results.find(
              (item) => item.type === "Trailer" || item.type === "Teaser"
            )
          );
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    console.log(trailer);
  };

  useEffect(() => {
    fetchTrailer(trailerUrl);
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
