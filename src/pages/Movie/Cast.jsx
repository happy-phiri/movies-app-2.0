import { useEffect, useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

const Cast = () => {
  const { id } = useParams();
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(false);
  const { movie } = useOutletContext();
  useDocumentTitle(`${movie.title} | Cast`);

  const fetchCredits = async () => {
    const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNDkyMzMyMy41OTE0MjgsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHErdJsQNMVwzlYgQXixTuN0pgmYTd6Uo_ElbeYKxwM",
      },
    };
    try {
      setLoading(true);
      await fetch(creditsUrl, options)
        .then((res) => res.json())
        .then((data) => setCredits(data.cast));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    console.log(credits);
  };

  useEffect(() => {
    fetchCredits();
  }, []);

  if (loading) {
    return (
      <section>
        <h1 className="text-xl font-montserrat">Loading . . .</h1>
      </section>
    );
  } else {
    return (
      <div className="text-black font-montserrat">
        <div className="flex gap-3 flex-wrap py-2">
          {credits.map((actor) => {
            return (
              <div key={actor.id} className="max-w-[100px]">
                <Link to={`/actors/${actor.id}`}>
                  {actor.profile_path === null ? (
                    <img
                      src="/src/assets/images/no-image.svg"
                      alt="no image"
                      className="object-cover w-[75px] h-[75px] rounded-full mx-auto theme-gradient"
                    />
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                      alt={actor.name}
                      className="object-cover w-[75px] h-[75px] rounded-full mx-auto"
                    />
                  )}
                  <p className="font-light text-xs text-center mt-2">
                    {actor.name}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Cast;
