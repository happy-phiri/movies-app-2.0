import { useOutletContext, Link } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

const ShowDetails = () => {
  const { show } = useOutletContext();
  useDocumentTitle(`Details | ${show.name}`);

  if (show) {
    // GET GENRES
    const genreElements = show.genres.map((genre) => {
      return <span key={genre.id}>{genre.name}</span>;
    });

    //GET SPOKEN LANGUAGES
    const spokenLanguages = show.spoken_languages.map((language) => {
      return (
        <span key={show.spoken_languages.indexOf(language)}>
          {language.english_name}
        </span>
      );
    });

    //GET PRODUCTION COUNTRIES
    const countries = show.production_countries.map((country) => {
      return (
        <span key={show.production_countries.indexOf(country)}>
          {country.name}
        </span>
      );
    });

    return (
      <div className="font-montserrat text-black text-sm md:text-base tracking-wide">
        {/* STATUS */}
        <p className="font-normal leading-normal">
          Status: <span className="font-light">{show.status}</span>
        </p>

        {/* RELEASE DATE */}
        <p className="font-normal leading-normal">
          First Aired on:{" "}
          <span className="font-light">{show.first_air_date}</span>
        </p>

        {/* LAST AIR DATE */}
        {show.last_air_date && (
          <p className="font-normal leading-normal">
            Last Aired on:{" "}
            <span className="font-light">{show.last_air_date}</span>
          </p>
        )}

        {/* SEASONS */}
        <p className="font-normal leading-normal">
          Number of Seasons:{" "}
          <span className="font-light">{show.number_of_seasons}</span>
        </p>

        {/* SEASONS */}
        <p className="font-normal leading-normal">
          Number of Episodes:{" "}
          <span className="font-light">{show.number_of_episodes}</span>
        </p>

        {/* GENRES */}
        <p className="font-normal leading-normal">
          Genres:{" "}
          <span className="font-light">
            {genreElements.reduce((prev, curr) => [prev, ", ", curr])}
          </span>
        </p>

        {/* LANGUAGES */}
        <p className="font-normal leading-normal">
          Languages:{" "}
          <span className="font-light">
            {spokenLanguages.reduce((prev, curr) => [prev, ", ", curr])}
          </span>
        </p>

        {/* COUNTRIES */}
        <p className="font-normal leading-normal">
          Produced in:{" "}
          <span className="font-light">
            {countries.reduce((prev, curr) => [prev, ", ", curr])}
          </span>
        </p>

        {/* CREATED BY */}
        <div>
          <p>Created by:</p>
          <div className="flex flex-row flex-wrap gap-3 my-4">
            {show.created_by.map((person) => (
              <div
                key={person.id}
                className="w-[140px] p-2 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
                <Link to={`/actors/${person.id}`} className="block">
                  {person.profile_path === null ? (
                    <img
                      src="/src/assets/images/no-image.svg"
                      alt="no image"
                      className="object-cover w-[100px] h-[100px] rounded-full mx-auto mb-2"
                    />
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                      alt={person.name}
                      className="object-cover w-[100px] h-[100px] rounded-full mx-auto mb-2"
                    />
                  )}
                  <p className="font-medium text-center mt-1 text-xs text-gray-800">
                    {person.name}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCTION COMPANIES */}
        <div>
          <p className="font-normal leading-normal">Production Companies:</p>
          <div className="flex gap-4 flex-wrap py-2">
            {show.production_companies.map((company) => {
              return (
                <div key={company.id} className="max-w-[100px]">
                  {company.logo_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${company.logo_path}`}
                      alt={company.name}
                      className="object-contain w-[100px] h-[100px] rounded-lg mx-auto"
                    />
                  ) : (
                    <img
                      src="/src/assets/images/no-image.svg"
                      alt="no image"
                      className=" mx-auto w-[100px] h-[100px] object-fit bg-transparent"
                    />
                  )}

                  <p className="font-light text-xs md:text-sm text-center mt-2">
                    {company.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <section>
        <h1 className="text-xl font-montserrat">Loading . . .</h1>
      </section>
    );
  }
};

export default ShowDetails;
