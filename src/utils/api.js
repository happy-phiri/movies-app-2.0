const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNDkyMzMyMy41OTE0MjgsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHErdJsQNMVwzlYgQXixTuN0pgmYTd6Uo_ElbeYKxwM";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// FETCH MOVIES PLAYING NOW
export const fetchPlayingMovies = async (page) => {
  const playingMoviesUrl = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;

  const response = await fetch(playingMoviesUrl, options);
  if (!response) {
    throw {
      message: response.statusText,
      status: response.status,
    };
  }

  const data = await response.json();
  return data;
};

// FETCH TOP RATED MOVIES
export const fetchTopRatedMovies = async (page) => {
  const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;

  const res = await fetch(topRatedMoviesUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data;
};

// FETCH POPULAR MOVIES
export const fetchPopularMovies = async (page) => {
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;

  const res = await fetch(popularMoviesUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data;
};

// FETCH TV SHOWS
export const fetchTvShows = async (page) => {
  const popularTvShowsUrl = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`;

  const res = await fetch(popularTvShowsUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data;
};

// FETCH POPULAR PEOPLE
export const fetchPeople = async (page) => {
  const peopleUrl = `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}`;

  const res = await fetch(peopleUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data;
};

// FETCH MOVIE
export const fetchMovie = async (id) => {
  const movieUrl = `https://api.themoviedb.org/3/movie/${id}`;

  const res = await fetch(movieUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data;
};

// FETCH MOVIE RECOMMENDATIONS OR SIMILAR MOVIES
export const fetchMovieRecommendations = async (id) => {
  const recommendationsUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNDkyMzMyMy41OTE0MjgsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHErdJsQNMVwzlYgQXixTuN0pgmYTd6Uo_ElbeYKxwM",
    },
  };

  const res = await fetch(recommendationsUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data;
};

// FETCH MOVIE TRAILER
export const fetchMovieTrailer = async (id) => {
  const trailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos`;

  const res = await fetch(trailerUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data;
};

// FETCH MOVIE CAST
export const fetchMovieCredits = async (id) => {
  const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/credits`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNDkyMzMyMy41OTE0MjgsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHErdJsQNMVwzlYgQXixTuN0pgmYTd6Uo_ElbeYKxwM",
    },
  };

  const res = await fetch(creditsUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data.cast;
};

// FETCH MOVIE REVIEWS
export const fetchMovieReviews = async (id) => {
  const reviewsUrl = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNDkyMzMyMy41OTE0MjgsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHErdJsQNMVwzlYgQXixTuN0pgmYTd6Uo_ElbeYKxwM",
    },
  };

  const res = await fetch(reviewsUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data.results;
};

// FETCH TV SHOW
export const fetchTvShow = async (id) => {
  const showUrl = `https://api.themoviedb.org/3/tv/${id}`;

  const res = await fetch(showUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data;
};

// FETCH SIMILAR TV SHOWS/ RECOMMENDATIONS
export const fetchShowRecommendations = async (id) => {
  const recommendationsUrl = `https://api.themoviedb.org/3/tv/${id}/recommendations`;

  const res = await fetch(recommendationsUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data.results;
};

// FETCH TV SHOW TRAILER
export const fetchTvShowTrailer = async (id) => {
  const trailerUrl = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;

  const res = await fetch(trailerUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data;
};

// FETCH TV SHOW CAST
export const fetchTvShowCast = async (id) => {
  const creditsUrl = `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`;

  const res = await fetch(creditsUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data.cast;
};

// FETCH TV SHOW REVIEWS
export const fetchTvShowReviews = async (id) => {
  const reviewsUrl = `https://api.themoviedb.org/3/tv/${id}/reviews?language=en-US&page=1`;
  const res = await fetch(reviewsUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data.results;
};

// FETCH SEASON
export const fetchTvShowSeason = async (id, seasonNumber) => {
  const seasonUrl = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}`;

  const res = await fetch(seasonUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data;
};

//FETCH EPISODE
export const fetchEpisode = async (id, seasonNumber, episodeNumber) => {
  const episodeUrl = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}`;

  // FETCH EPISODE DETAILS
  const res = await fetch(episodeUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data;
};

// FETCH EPISODE TRAILER
export const fetchEpisodeTrailer = async (id, seasonNumber, episodeNumber) => {
  const trailerUrl = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}/episode/${episodeNumber}/videos`;

  const res = await fetch(trailerUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data;
};

// FETCH ACTOR
export const fetchActor = async (personId) => {
  const personUrl = `https://api.themoviedb.org/3/person/${personId}`;

  const res = await fetch(personUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data;
};

// FETCH ACTOR MOVIE APPEARANCES
export const fetchActorMovieAppearances = async (personId) => {
  const movieCreditsUrl = `https://api.themoviedb.org/3/person/${personId}/combined_credits`;
  const res = await fetch(movieCreditsUrl, options);
  if (!res) {
    throw {
      message: res.status_message,
      status: res.status_code,
    };
  }
  const data = await res.json();
  return data.cast;
};
