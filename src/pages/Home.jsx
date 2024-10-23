import Hero from "../components/Hero";
import Slider from "../components/sliders/Slider";
import useDocumentTitle from "../Hooks/useDocumentTitle";
import { Link, useLoaderData } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import ShowsSlider from "../components/sliders/ShowsSlider";
import {
  fetchPlayingMovies,
  fetchTopRatedMovies,
  fetchPopularMovies,
  fetchTvShows,
} from "../utils/api";

export const loader = async () => {
  const [playingMovies, popularMovies, topRatedMovies, popularTvShows] =
    await Promise.all([
      fetchPlayingMovies(1),
      fetchPopularMovies(1),
      fetchTopRatedMovies(1),
      fetchTvShows(1),
    ]);

  return {
    playingMovies: playingMovies.results,
    popularMovies: popularMovies.results,
    topRatedMovies: topRatedMovies.results,
    popularTvShows: popularTvShows.results,
  };
};

const Home = () => {
  const { playingMovies, popularMovies, topRatedMovies, popularTvShows } =
    useLoaderData();
  useDocumentTitle("Home | Movies, TV Shows & TV Personalities");

  return (
    <main className="mb-16">
      <section>
        <Hero playingMovies={playingMovies} />
        <div className="mt-5 max-container small-screen-padding font-montserrat tracking-wide">
          <div>
            <div className="flex justify-between items-center flex-nowrap">
              <h2 className="text-2xl font-medium max-sm:text-xl py-5">
                Now Playing
              </h2>
              <Link to="now-playing">
                <button className="flex flex-row flex-nowrap gap-2 items-center hover:text-light-green">
                  More <FaChevronRight />
                </button>
              </Link>
            </div>
            <Slider arr={playingMovies} />
          </div>

          <div className="mt-5">
            <div className="flex justify-between items-center flex-nowrap">
              <h2 className="text-2xl max-sm:text-xl font-medium py-5">
                Popular Movies
              </h2>
              <Link to="popular">
                <button className="flex flex-row flex-nowrap gap-2 items-center hover:text-light-green">
                  More <FaChevronRight />
                </button>
              </Link>
            </div>
            <Slider arr={popularMovies} />
          </div>

          <div className="mt-5">
            <div className="flex justify-between items-center flex-nowrap">
              <h2 className="text-2xl max-sm:text-xl font-medium py-5">
                Top Rated Movies
              </h2>
              <Link to="top-rated">
                <button className="flex flex-row flex-nowrap gap-2 items-center hover:text-light-green">
                  More <FaChevronRight />
                </button>
              </Link>
            </div>
            <Slider arr={topRatedMovies} />
          </div>

          <div className="mt-5">
            <div className="flex justify-between items-center flex-nowrap">
              <h2 className="text-2xl max-sm:text-xl font-medium py-5">
                Popular TV Shows
              </h2>
              <Link to="shows">
                <button className="flex flex-row flex-nowrap gap-2 items-center hover:text-light-green">
                  More <FaChevronRight />
                </button>
              </Link>
            </div>
            <ShowsSlider arr={popularTvShows} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
