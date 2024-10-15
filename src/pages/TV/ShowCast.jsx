import { useEffect, useState } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

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
    try {
      setLoading(true);
      await fetch(creditsUrl, options)
        .then((res) => res.json())
        .then((data) => {
          setCast(data.cast);
          console.log(data);
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    // console.log(credits);
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
        <div className="flex gap-3 flex-wrap max-sm:justify-center py-2">
          {cast.map((actor) => {
            return (
              <div
                key={actor.id}
                className="w-[140px] p-2 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
                <Link to={`/actors/${actor.id}`} className="block">
                  {actor.profile_path === null ? (
                    <img
                      src="/src/assets/images/no-image.svg"
                      alt="no image"
                      className="object-cover w-[100px] h-[100px] rounded-full mx-auto mb-2"
                    />
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
                      alt={actor.name}
                      className="object-cover w-[100px] h-[100px] rounded-full mx-auto mb-2"
                    />
                  )}
                  <div className="text-center mt-1">
                    <p className="font-medium text-xs text-gray-800">
                      {actor.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      as {actor.character}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default ShowCast;
