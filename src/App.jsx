import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home, { loader as homePageLoader } from "./pages/Home";
import Popular, { loader as popularMoviesLoader } from "./pages/Popular";
import NowPlaying, { loader as playingMoviesLoader } from "./pages/NowPlaying";
import TopRated, { loader as topRatedMoviesLoader } from "./pages/TopRated";
import TvShows, { loader as tvShowsLoader } from "./pages/TvShows";
import People, { loader as peopleLoader } from "./pages/People";
import Search from "./pages/Search";
import Movie, { loader as movieLoader } from "./pages/Movie/Movie";
import Overview from "./pages/Movie/Overview";
import Details from "./pages/Movie/Details";
import Trailer, { loader as movieTrailerLoader } from "./pages/Movie/Trailer";
import Cast, { loader as movieCastLoader } from "./pages/Movie/Cast";
import Reviews, { loader as movieReviewsLoader } from "./pages/Movie/Reviews";
import Actor, { loader as actorLoader } from "./pages/Actor";
import PageNotFound from "./pages/PageNotFound";
import Show, { loader as tvShowLoader } from "./pages/TV/Show";
import ShowOverview from "./pages/TV/ShowOverview";
import ShowDetails from "./pages/TV/ShowDetails";
import Seasons from "./pages/TV/Seasons";
import ShowTrailer, { loader as tvShowTrailer } from "./pages/TV/ShowTrailer";
import ShowCast, { loader as tvShowCast } from "./pages/TV/ShowCast";
import ShowReviews, {
  loader as tvShowReviewsLoader,
} from "./pages/TV/ShowReviews";
import Error from "./components/Error";
import Season, { loader as seasonLoader } from "./pages/TV/Season/Season";
import Episode, { loader as episodeLoader } from "./pages/TV/Season/Episode";
import GuestStars from "./pages/TV/Season/GuestStars";
import Crew from "./pages/TV/Season/Crew";
import EpisodeTrailer, {
  loader as episodeTrailerLoader,
} from "./pages/TV/Season/EpisodeTrailer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route
        index
        element={<Home />}
        errorElement={<Error />}
        loader={homePageLoader}
      />
      <Route
        path="popular"
        element={<Popular />}
        errorElement={<Error />}
        loader={popularMoviesLoader}
      />
      <Route
        path="now-playing"
        element={<NowPlaying />}
        loader={playingMoviesLoader}
        errorElement={<Error />}
      />
      <Route
        path="top-rated"
        element={<TopRated />}
        errorElement={<Error />}
        loader={topRatedMoviesLoader}
      />
      <Route path="search" element={<Search />} errorElement={<Error />} />
      <Route
        path=":id"
        element={<Movie />}
        errorElement={<Error />}
        loader={movieLoader}>
        <Route index element={<Overview />} />
        <Route path="details" element={<Details />} />
        <Route
          path="trailer"
          element={<Trailer />}
          loader={movieTrailerLoader}
        />
        <Route path="cast" element={<Cast />} loader={movieCastLoader} />
        <Route
          path="reviews"
          element={<Reviews />}
          loader={movieReviewsLoader}
        />
      </Route>
      <Route
        path="shows"
        element={<TvShows />}
        errorElement={<Error />}
        loader={tvShowsLoader}
      />
      <Route
        path="shows/:id"
        element={<Show />}
        errorElement={<Error />}
        loader={tvShowLoader}>
        <Route index element={<ShowOverview />} />
        <Route path="details" element={<ShowDetails />} />
        <Route path="seasons" element={<Seasons />} />
        <Route
          path="trailer"
          element={<ShowTrailer />}
          loader={tvShowTrailer}
        />
        <Route path="cast" element={<ShowCast />} loader={tvShowCast} />
        <Route
          path="reviews"
          element={<ShowReviews />}
          loader={tvShowReviewsLoader}
        />
      </Route>
      <Route
        path="shows/:id/seasons/:seasonNumber"
        element={<Season />}
        loader={seasonLoader}
      />
      <Route
        path="shows/:id/seasons/:seasonNumber/:episodeNumber"
        element={<Episode />}
        loader={episodeLoader}>
        <Route index element={<GuestStars />} />
        <Route path="crew" element={<Crew />} />
        <Route
          path="trailer"
          element={<EpisodeTrailer />}
          loader={episodeTrailerLoader}
        />
      </Route>
      <Route path="actors" errorElement={<Error />}>
        <Route index element={<People />} loader={peopleLoader} />
        <Route path=":personId" element={<Actor />} loader={actorLoader} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
