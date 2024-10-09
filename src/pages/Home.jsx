import Hero from "../components/Hero";
import { useGlobalContext } from "../context";
import Slider from "../components/Slider";
import useDocumentTitle from "../Hooks/useDocumentTitle";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const Home = () => {
  const { loading, playingMovies, popularMovies, topRatedMovies } =
    useGlobalContext();
  useDocumentTitle("Home");

  return (
    <main className=" ">
      {loading ? (
        <section>
          <h1>Loading . . .</h1>
        </section>
      ) : (
        <section>
          <Hero />
          <div className="max-container small-screen-padding mt-5">
            <div>
              <div className="font-montserrat tracking-wide flex justify-between items-center flex-nowrap">
                <h2 className="font-montserrat text-2xl max-sm:text-xl py-5">
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
              <div className="font-montserrat tracking-wide flex justify-between items-center flex-nowrap">
                <h2 className="font-montserrat text-2xl max-sm:text-xl py-5">
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
              <div className="font-montserrat tracking-wide flex justify-between items-center flex-nowrap">
                <h2 className="font-montserrat text-2xl max-sm:text-xl py-5">
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
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
