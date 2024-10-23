/* eslint-disable react/prop-types */
import { useContext, createContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState(
    JSON.parse(localStorage.getItem("favoriteMovies")) || []
  );

  // ADD MOVIE TO FAVORITE MOVIES LIST
  const addToFavorites = (movie) => {
    //CHECK IF ALREADY A FAVORITE MOVIE
    const alreadyFavorite = favoriteMovies.find(
      (favorite) => favorite.id === movie.id
    );

    if (alreadyFavorite) {
      return;
    } else {
      const updatedFavorites = [movie, ...favoriteMovies];
      setFavoriteMovies(updatedFavorites);
      localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    }
  };

  // REMOVE MOVIE FROM FAVORITE MOVIES LIST
  const removeFromFavorites = (movie) => {
    const updatedFavorites = favoriteMovies.filter(
      (favMovie) => favMovie.id !== movie.id
    );
    setFavoriteMovies(updatedFavorites);
    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
  };

  return (
    <AppContext.Provider
      value={{
        addToFavorites,
        favoriteMovies,
        removeFromFavorites,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
