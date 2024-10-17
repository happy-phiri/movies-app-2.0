import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowCard from "../../components/ShowCard";

const Similar = () => {
  const { id } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    const recommendationsUrl = `https://api.themoviedb.org/3/tv/${id}/recommendations`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNDkyMzMyMy41OTE0MjgsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHErdJsQNMVwzlYgQXixTuN0pgmYTd6Uo_ElbeYKxwM",
      },
    };

    setLoading(true);
    const res = await fetch(recommendationsUrl, options);
    if (!res) {
      throw {
        message: res.status_message,
        status: res.status_code,
      };
    }
    const data = await res.json();
    setRecommendations(data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchRecommendations();
  }, [id]);

  if (loading) {
    return (
      <section className="mt-10 pt-4 border-t border-t-slate-200">
        <h1 className="text-xl font-montserrat small-screen-padding">
          Loading . . .
        </h1>
      </section>
    );
  } else if (recommendations) {
    return (
      <section className="mt-10 pt-4 border-t border-t-slate-200">
        <h2 className="font-montserrat text-2xl mb-2 tracking-wide">
          Similar Shows
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-md:gap-2 gap-4">
          {recommendations.slice(0, 10).map((recommendation) => {
            return (
              <ShowCard
                key={recommendation.id}
                movie={recommendation}
                id={recommendation.id}
                image={recommendation.poster_path}
                title={recommendation.name || recommendation.title}
                released={
                  recommendation.first_air_date || recommendation.release_date
                }
                voteAverage={recommendation.vote_average}
                voteCount={recommendation.vote_count}
                overview={recommendation.overview}
                className="w-[250px]"
              />
            );
          })}
        </div>
      </section>
    );
  }
};

export default Similar;
