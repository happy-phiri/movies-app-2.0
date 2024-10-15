import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Actor from "./pages/Movie/Actor";
import People from "./pages/People";
import PageNotFound from "./pages/PageNotFound";
import Show from "./pages/TV/Show";
import ShowOverview from "./pages/TV/ShowOverview";
import ShowDetails from "./pages/TV/ShowDetails";
import Seasons from "./pages/TV/Seasons";
import ShowTrailer from "./pages/TV/ShowTrailer";
import ShowCast from "./pages/TV/ShowCast";
import ShowReviews from "./pages/TV/ShowReviews";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="popular" element={<Popular />} />
          <Route path="now-playing" element={<NowPlaying />} />
          <Route path="top-rated" element={<TopRated />} />
          <Route path="search" element={<Search />} />
          <Route path=":id" element={<Movie />}>
            <Route index element={<Overview />} />
            <Route path="details" element={<Details />} />
            <Route path="trailer" element={<Trailer />} />
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="shows" element={<TvShows />} />
          <Route path="shows/:id" element={<Show />}>
            <Route index element={<ShowOverview />} />
            <Route path="details" element={<ShowDetails />} />
            <Route path="seasons" element={<Seasons />} />
            <Route path="trailer" element={<ShowTrailer />} />
            <Route path="cast" element={<ShowCast />} />
            <Route path="reviews" element={<ShowReviews />} />
          </Route>
          <Route path="actors">
            <Route index element={<People />} />
            <Route path=":personId" element={<Actor />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
