import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import CharacterCard from "../../components/CharacterCard";

const ShowCast = () => {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const { show } = useOutletContext();
  useDocumentTitle(`Cast | ${show.name}`);

  const fetchCredits = async () => {
    const creditsUrl = `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNDkyMzMyMy41OTE0MjgsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHErdJsQNMVwzlYgQXixTuN0pgmYTd6Uo_ElbeYKxwM",
      },
    };

    setLoading(true);
    const res = await fetch(creditsUrl, options);
    if (!res) {
      throw {
        message: res.status_message,
        status: res.status_code,
      };
    }
    const data = await res.json();
    setCast(data.cast);
    setLoading(false);
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  if (loading) {
    return (
      <section>
        <p className="text-base tracking-wide font-montserrat">Loading . . .</p>
      </section>
    );
  } else {
    return (
      <div className="flex gap-3 flex-wrap max-sm:justify-center py-2">
        {cast.map((actor) => {
          return (
            <CharacterCard
              key={actor.id}
              id={actor.id}
              image={actor.profile_path}
              name={actor.name}
              character={actor.character}
            />
          );
        })}
      </div>
    );
  }
};

export default ShowCast;
