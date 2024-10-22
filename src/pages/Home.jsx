import Hero from "../components/Hero";
import { useGlobalContext } from "../context";
import Slider from "../components/Slider";
import useDocumentTitle from "../Hooks/useDocumentTitle";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import ShowsSlider from "../components/ShowsSlider";

const Home = () => {
  const {
    loading,
    playingMovies,
    popularMovies,
    topRatedMovies,
    popularTvShows,
  } = useGlobalContext();
  useDocumentTitle("Home | Movies, TV Shows & TV Personalities");

  return (
    <main className="mb-16">
      {loading ? (
        <h1 className="text-xl max-container font-montserrat small-screen-padding pt-28 top-0 left-0 min-h-dvh">
          Loading . . .
        </h1>
      ) : (
        <section>
          <Hero />
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
      )}
    </main>
  );
};

export default Home;
