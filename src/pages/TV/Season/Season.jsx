import { useLoaderData, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import EpisodeCard from "../../../components/cards/EpisodeCard";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import { fetchTvShowSeason, fetchTvShow } from "../../../utils/api";
import useScrollToTop from "../../../Hooks/useScrollToTop";

export const loader = async ({ params }) => {
  const { id, seasonNumber } = params;
  const [show, season] = await Promise.all([
    fetchTvShow(id),
    fetchTvShowSeason(id, seasonNumber),
  ]);
  return {
    show: show,
    season: season,
  };
};

const Season = () => {
  const { seasonNumber } = useParams();
  const { show, season } = useLoaderData();
  useDocumentTitle(show && `${show.name} | Season ${seasonNumber} `);
  useScrollToTop(null);

  const backgroundImage = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${show.backdrop_path})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <main className="mb-16">
      <section className="relative">
        <div
          style={backgroundImage}
          className="small-screen-padding top-0 left-0 right-0 bottom-0 pt-24 pb-10 w-full h-min bg-blend-overlay bg-[rgba(0,0,0,0.6)]">
          <div className="max-container grid grid-cols-1 auto-rows-min gap-2 md:grid-cols-5 md:items-center md:gap-8">
            <div className="grid place-items-center md:col-span-2">
              <img
                src={`https://image.tmdb.org/t/p/original/${season.poster_path}`}
                alt={season.name}
                className="rounded-lg"
              />
            </div>

            <div className="md:col-span-3 self-center">
              {season && (
                <div className="font-montserrat mb-3 text-white tracking-wide">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl my-2 ">
                    {season.name}
                  </h1>
                  {season.overview && (
                    <p className="font-light text-sm my-2 xl:text-base leading-normal lg:w-[90%]">
                      {season.overview}
                    </p>
                  )}
                  {season.episodes && (
                    <p className="font-light text-sm my-1 xl:text-base leading-normal lg:w-[65%]">
                      {season.episodes.length} episodes
                    </p>
                  )}
                  <p className="font-light text-sm my-1 xl:text-base leading-normal">
                    Aired from {season.air_date}
                  </p>
                  <p className="font-light leading-normal flex justify-start items-center gap-2 text-sm xl:text-base mb-4">
                    <FaStar className="text-yellow-400 xl:text-sm" />
                    <FaStar className="text-yellow-400 xl:text-sm" />
                    <FaStar className="text-yellow-400 xl:text-sm" />
                    {season.vote_average.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="max-container small-screen-padding mt-7">
        <h2 className="font-montserrat font-medium text-2xl mb-2 tracking-wide">
          Episodes
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {season &&
            season.episodes.map((episode) => {
              return (
                <EpisodeCard
                  key={episode.id}
                  image={episode.still_path}
                  name={episode.name}
                  episodeNumber={episode.episode_number}
                  aired={episode.air_date}
                  voteAverage={episode.vote_average}
                  voteCount={episode.vote_count}
                  runtime={episode.runtime}
                  seasonNumber={seasonNumber}
                />
              );
            })}
        </div>
      </section>
    </main>
  );
};

export default Season;
