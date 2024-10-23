import { Link, useLoaderData } from "react-router-dom";
import useDocumentTitle from "../Hooks/useDocumentTitle";
import noImage from "../assets/images/no-image.svg";
import noImagePng from "../assets/images/no_image.png";
import { fetchActor, fetchActorMovieAppearances } from "../utils/api";

export const loader = async ({ params }) => {
  const { personId } = params;
  const [actor, movieCredits] = await Promise.all([
    fetchActor(personId),
    fetchActorMovieAppearances(personId),
  ]);
  return {
    actor: actor,
    movieCredits: movieCredits,
  };
};

const Actor = () => {
  const { actor, movieCredits } = useLoaderData();
  useDocumentTitle(actor.name);

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  };

  return (
    <main className="mb-16">
      <section className="max-container small-screen-padding pt-28 font-montserrat grid md:grid-cols-6 gap-5 lg:gap-10">
        <div className="md:col-span-2">
          {actor.profile_path !== null ? (
            <img
              src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
              alt={actor.name}
              className="rounded-lg w-full shadow-xl shadow-slate-500"
            />
          ) : (
            <img src={noImage} />
          )}
        </div>

        <div className="md:col-span-4">
          <div>
            <h1 className="text-3xl lg:text-6xl mb-2">{actor.name}</h1>
            {actor.birthday && (
              <p className="font-medium leading-normal text-base tracking-wide">
                Born:{" "}
                <span className="font-light">{formatDate(actor.birthday)}</span>
              </p>
            )}
            {actor.place_of_birth && (
              <p className="font-medium leading-normal text-base tracking-wide">
                Place of Birth:{" "}
                <span className="font-light">{actor.place_of_birth}</span>
              </p>
            )}
            {actor.deathday && (
              <p className="font-medium leading-normal text-base tracking-wide">
                Died:{" "}
                <span className="font-light">{formatDate(actor.deathday)}</span>
              </p>
            )}
            {actor.known_for_department && (
              <p className="font-medium leading-normal text-base tracking-wide">
                Known For:{" "}
                <span className="font-light">
                  {actor.known_for_department
                    ? actor.known_for_department
                    : "-"}
                </span>
              </p>
            )}
            {actor.biography && (
              <p className="font-medium leading-normal text-base tracking-wide">
                Biography:{" "}
                <span className="font-light">
                  {actor.biography ? actor.biography : "-"}
                </span>
              </p>
            )}
            <p className="font-normal leading-normal text-base tracking-wide mt-3 italic">
              Find out more about{" "}
              <a
                href={`https://www.imdb.com/name/${actor.imdb_id}/`}
                target="_blank"
                className="font-medium theme-gradient-text">
                {actor.name}
              </a>{" "}
              on IMDB
            </p>
          </div>
        </div>
      </section>

      <section className="max-container small-screen-padding font-montserrat mt-4 md:mt-12">
        <h2 className="font-montserrat font-medium text-2xl mb-4 tracking-wide">
          Film and TV Show Appearances
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {movieCredits.map((movie) => {
            return (
              <div
                key={movie.id}
                className="shadow-md shadow-slate-300 rounded-b-lg hover:shadow-lg">
                <Link
                  to={
                    movie.media_type === "movie"
                      ? `/${movie.id}`
                      : `/shows/${movie.id}`
                  }>
                  {movie.poster_path === null ? (
                    <img
                      src={noImagePng}
                      alt="no image"
                      className="min-h-[360px] object-contain"
                    />
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt={movie.title}
                      className="rounded-t-lg min-h-[360px] object-cover"
                    />
                  )}
                  <h3 className="text-center px-2 py-3">
                    {movie.title || movie.name}
                  </h3>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Actor;
