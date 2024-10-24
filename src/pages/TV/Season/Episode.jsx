import { useParams, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import { fetchTvShow, fetchEpisode } from "../../../utils/api";
import useScrollToTop from "../../../Hooks/useScrollToTop";

export const loader = async ({ params }) => {
  const { id, seasonNumber, episodeNumber } = params;
  const [show, episode] = await Promise.all([
    fetchTvShow(id),
    fetchEpisode(id, seasonNumber, episodeNumber),
  ]);
  return {
    show: show,
    episode: episode,
  };
};

const Episode = () => {
  const { show, episode } = useLoaderData();
  const { seasonNumber, episodeNumber } = useParams();
  useDocumentTitle(
    show && `${show.name} | Season ${seasonNumber} | Episode ${episodeNumber}`
  );
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
          className="small-screen-padding grid place-content-center top-0 left-0 right-0 bottom-0  pb-10 w-full min-h-[75dvh] bg-blend-overlay bg-[rgba(0,0,0,0.7)]">
          <div className="max-container grid grid-cols-1 auto-rows-min gap-2 md:grid-cols-5 md:items-center md:gap-8">
            <div className="grid place-items-center md:col-span-2">
              <img
                src={`https://image.tmdb.org/t/p/original/${episode.still_path}`}
                alt={episode.name}
                className="rounded-lg"
              />
            </div>

            <div className="md:col-span-3 self-center">
              {episode && (
                <div className="font-montserrat mb-3 text-white tracking-wide">
                  <p className="theme-gradient px-3 py-2 rounded-md inline-block mb-3 text-sm md:text-base">
                    Season {seasonNumber} | Episode {episodeNumber}
                  </p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl my-3 ">
                    {episode.name}
                  </h1>
                  {episode.overview && (
                    <p className="font-light text-sm my-3 xl:text-base leading-normal lg:w-[90%]">
                      {episode.overview}
                    </p>
                  )}
                  <p className="font-light text-sm my-1 xl:text-base leading-normal">
                    Aired on {episode.air_date}
                  </p>
                  <p className="font-light leading-normal flex justify-start items-center gap-2 text-sm xl:text-base mb-4">
                    <FaStar className="text-yellow-400 xl:text-sm" />
                    <FaStar className="text-yellow-400 xl:text-sm" />
                    <FaStar className="text-yellow-400 xl:text-sm" />
                    {episode.vote_average.toFixed(2)}
                    <GoDotFill className="text-xs" />
                    <span>({episode.vote_count} Votes)</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="max-container small-screen-padding mt-7">
        <nav className="text-black text-xs xl:text-base tracking-wider font-montserrat flex flex-wrap gap-2 mb-4">
          <NavLink
            to="."
            end
            className={({ isActive }) =>
              isActive
                ? "border border-opacity-50 border-[#01b4e4] theme-gradient-text px-2 py-2"
                : "border px-2 py-2 hover:theme-gradient-text hover:border-[#01b4e4]"
            }>
            Guest Stars
          </NavLink>
          <NavLink
            to="crew"
            className={({ isActive }) =>
              isActive
                ? "border border-opacity-50 border-[#01b4e4] theme-gradient-text px-2 py-2"
                : "border px-2 py-2 hover:theme-gradient-text hover:border-[#01b4e4]"
            }>
            Crew
          </NavLink>
          <NavLink
            to="trailer"
            className={({ isActive }) =>
              isActive
                ? "border border-opacity-50 border-[#01b4e4] theme-gradient-text px-2 py-2"
                : "border px-2 py-2 hover:theme-gradient-text hover:border-[#01b4e4]"
            }>
            Trailer
          </NavLink>
        </nav>
      </section>
      {/* OUTLET FOR GUEST STARS, CREW AND TRAILER */}
      <section className="max-container small-screen-padding">
        <Outlet context={{ episode, seasonNumber, show }} />
      </section>
    </main>
  );
};

export default Episode;
