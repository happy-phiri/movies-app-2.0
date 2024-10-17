import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

const ShowTrailer = () => {
  const { id } = useParams();
  const [trailer, setTrailer] = useState("");
  const [loading, setLoading] = useState(false);
  const { show } = useOutletContext();
  useDocumentTitle(`Trailer | ${show.name}`);

  const fetchTrailer = async () => {
    const trailerUrl = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNDkyMzMyMy41OTE0MjgsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHErdJsQNMVwzlYgQXixTuN0pgmYTd6Uo_ElbeYKxwM",
      },
    };
    const res = await fetch(trailerUrl, options);
    if (!res) {
      throw {
        message: res.status_message,
        status: res.status_code,
      };
    }
    const data = await res.json();
    if (data.results.length === 1) {
      // If there's only one result, set the trailer to that item directly
      setTrailer(data.results[0]);
    } else {
      // Otherwise, find a trailer based on type or name
      const trailerData = data.results.find(
        (item) =>
          item.type === "Trailer" ||
          item.name.includes("Official") ||
          item.name.includes("Trailer")
      );
      setTrailer(trailerData);
    }

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
    return (
      <p className="text-base font-montserrat font-light tracking-wide text-black">
        Sorry, trailer not found
      </p>
    );
  }
};

export default ShowTrailer;
