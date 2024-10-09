/* eslint-disable react/prop-types */
import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [playingMovies, setPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState(
    JSON.parse(localStorage.getItem("favoriteMovies")) || []
  );

  const playingMoviesUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=`;
  const popularMoviesUrl =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=";
  const topRatedMoviesUrl =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNDkyMzMyMy41OTE0MjgsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHErdJsQNMVwzlYgQXixTuN0pgmYTd6Uo_ElbeYKxwM",
    },
  };

  const fetchPlayingMovies = async (url) => {
    try {
      setLoading(true);
      await fetch(url, options)
        .then((res) => res.json())
        .then((data) => setPlayingMovies(data.results));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const fetchPopularMovies = async (url) => {
    try {
      setLoading(true);
      await fetch(url, options)
        .then((res) => res.json())
        .then((data) => setPopularMovies(data.results));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const fetchTopRatedMovies = async (url) => {
    try {
      setLoading(true);
      await fetch(url, options)
        .then((res) => res.json())
        .then((data) => setTopRatedMovies(data.results));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

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

  useEffect(() => {
    fetchPlayingMovies(`${playingMoviesUrl}${page}`);
  }, [page]);

  useEffect(() => {
    fetchPopularMovies(`${popularMoviesUrl}${page}`);
  }, [page]);

  useEffect(() => {
    fetchTopRatedMovies(`${topRatedMoviesUrl}${page}`);
  }, [page]);

  return (
    <AppContext.Provider
      value={{
        loading,
        playingMovies,
        popularMovies,
        topRatedMovies,
        addToFavorites,
        favoriteMovies,
        removeFromFavorites,
        showSearchModal,
        setShowSearchModal,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
