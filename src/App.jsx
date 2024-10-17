import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Popular from "./pages/Popular";
import NowPlaying from "./pages/NowPlaying";
import TopRated from "./pages/TopRated";
import TvShows from "./pages/TvShows";
import Search from "./pages/Search";
import Movie from "./pages/Movie/Movie";
import Overview from "./pages/Movie/Overview";
import Details from "./pages/Movie/Details";
import Trailer from "./pages/Movie/Trailer";
import Cast from "./pages/Movie/Cast";
import Reviews from "./pages/Movie/Reviews";
import Actor from "./pages/Actor";
import People from "./pages/People";
import PageNotFound from "./pages/PageNotFound";
import Show from "./pages/TV/Show";
import ShowOverview from "./pages/TV/ShowOverview";
import ShowDetails from "./pages/TV/ShowDetails";
import Seasons from "./pages/TV/Seasons";
import ShowTrailer from "./pages/TV/ShowTrailer";
import ShowCast from "./pages/TV/ShowCast";
import ShowReviews from "./pages/TV/ShowReviews";
import Error from "./components/Error";
import Season from "./pages/TV/Season/Season";
import Episode from "./pages/TV/Season/Episode";
import GuestStars from "./pages/TV/Season/GuestStars";
import Crew from "./pages/TV/Season/Crew";
import EpisodeTrailer from "./pages/TV/Season/EpisodeTrailer";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} errorElement={<Error />} />
      <Route path="popular" element={<Popular />} errorElement={<Error />} />
      <Route
        path="now-playing"
        element={<NowPlaying />}
        errorElement={<Error />}
      />
      <Route path="top-rated" element={<TopRated />} errorElement={<Error />} />
      <Route path="search" element={<Search />} errorElement={<Error />} />
      <Route path=":id" element={<Movie />} errorElement={<Error />}>
        <Route index element={<Overview />} />
        <Route path="details" element={<Details />} />
        <Route path="trailer" element={<Trailer />} />
        <Route path="cast" element={<Cast />} />
        <Route path="reviews" element={<Reviews />} />
      </Route>
      <Route path="shows" element={<TvShows />} errorElement={<Error />} />
      <Route path="shows/:id" element={<Show />} errorElement={<Error />}>
        <Route index element={<ShowOverview />} />
        <Route path="details" element={<ShowDetails />} />
        <Route path="seasons" element={<Seasons />} />
        <Route path="trailer" element={<ShowTrailer />} />
        <Route path="cast" element={<ShowCast />} />
        <Route path="reviews" element={<ShowReviews />} />
      </Route>
      <Route path="shows/:id/seasons/:seasonNumber" element={<Season />} />
      <Route
        path="shows/:id/seasons/:seasonNumber/:episodeNumber"
        element={<Episode />}>
        <Route index element={<GuestStars />} />
        <Route path="crew" element={<Crew />} />
        <Route path="trailer" element={<EpisodeTrailer />} />
      </Route>
      <Route path="actors" errorElement={<Error />}>
        <Route index element={<People />} />
        <Route path=":personId" element={<Actor />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
