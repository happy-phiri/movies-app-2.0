import { useOutletContext } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import SeasonCard from "../../components/cards/SeasonCard";

const Seasons = () => {
  const { show } = useOutletContext();
  useDocumentTitle(`Seasons | ${show.name}`);

  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-md:gap-2 gap-4">
      {show &&
        show.seasons.map((season) => {
          if (season.season_number > 0) {
            return (
              <SeasonCard
                key={season.id}
                seasonNumber={season.season_number}
                image={season.poster_path}
                overview={season.overview}
                name={season.name}
                episodes={season.episode_count}
                aired={season.air_date}
                voteAverage={season.vote_average}
              />
            );
          }
        })}
    </section>
  );
};

export default Seasons;
