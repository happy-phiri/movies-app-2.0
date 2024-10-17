/* eslint-disable react/prop-types */
import { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [playingMovies, setPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularTvShows, setPopularTvShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState(
    JSON.parse(localStorage.getItem("favoriteMovies")) || []
  );

  const playingMoviesUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`;
  const popularMoviesUrl =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const topRatedMoviesUrl =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
  const popularTvShowsUrl = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNDkyMzMyMy41OTE0MjgsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHErdJsQNMVwzlYgQXixTuN0pgmYTd6Uo_ElbeYKxwM",
    },
  };

  // FETCHES THE NOW PLAYING MOVIES ON THE HOME PAGE
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

  // FETCHES THE POPULAR MOVIES ON THE HOME PAGE
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

  // FETCHES THE TOP RATED MOVIES ON THE HOME PAGE
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

  // FETCHES THE POPULAR TV SHOWS ON THE HOME PAGE
  const fetchPopularTvShows = async (url) => {
    try {
      setLoading(true);
      await fetch(url, options)
        .then((res) => res.json())
        .then((data) => setPopularTvShows(data.results));
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
    fetchPlayingMovies(playingMoviesUrl);
    fetchPopularMovies(popularMoviesUrl);
    fetchTopRatedMovies(topRatedMoviesUrl);
    fetchPopularTvShows(popularTvShowsUrl);
  }, []);

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
        popularTvShows,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
