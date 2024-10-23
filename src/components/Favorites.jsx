import { useGlobalContext } from "../context";
import FavoriteMoviesSlider from "./sliders/FavoriteMoviesSlider";

const Favorites = () => {
  const { favoriteMovies } = useGlobalContext();

  return (
    <aside className="mt-6">
      <h2 className="font-montserrat text-xl text-white tracking-wide mb-2">
        Favorite Movies
      </h2>
      <FavoriteMoviesSlider arr={favoriteMovies} />
    </aside>
  );
};

export default Favorites;
