import { useOutletContext } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import CharacterCard from "../../components/cards/CharacterCard";
import noImage from "../../assets/images/no-image.svg";

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
      <div className="font-montserrat leading-normal text-black text-sm md:text-base tracking-wide">
        {/* STATUS */}
        <p>
          Status: <span className="font-light">{show.status}</span>
        </p>

        {/* RELEASE DATE */}
        <p>
          First Aired on:{" "}
          <span className="font-light">{show.first_air_date}</span>
        </p>

        {/* LAST AIR DATE */}
        {show.last_air_date && (
          <p>
            Last Aired on:{" "}
            <span className="font-light">{show.last_air_date}</span>
          </p>
        )}

        {/* SEASONS */}
        <p>
          Number of Seasons:{" "}
          <span className="font-light">{show.number_of_seasons}</span>
        </p>

        {/* SEASONS */}
        <p>
          Number of Episodes:{" "}
          <span className="font-light">{show.number_of_episodes}</span>
        </p>

        {/* GENRES */}
        <p>
          Genres:{" "}
          <span className="font-light">
            {genreElements.reduce((prev, curr) => [prev, ", ", curr])}
          </span>
        </p>

        {/* LANGUAGES */}
        <p>
          Languages:{" "}
          <span className="font-light">
            {spokenLanguages.reduce((prev, curr) => [prev, ", ", curr])}
          </span>
        </p>

        {/* COUNTRIES */}
        <p>
          Produced in:{" "}
          <span className="font-light">
            {countries.reduce((prev, curr) => [prev, ", ", curr])}
          </span>
        </p>

        {/* CREATED BY */}
        {show.created_by.length > 0 && (
          <div>
            <p>Created by:</p>
            <div className="flex flex-row flex-wrap gap-3 my-4">
              {show.created_by.map((person) => (
                <CharacterCard
                  key={person.id}
                  id={person.id}
                  image={person.profile_path}
                  name={person.name}
                />
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTION COMPANIES */}
        <div>
          <p>Production Companies:</p>
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
                      src={noImage}
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
        <p className="text-base tracking-wide font-light font-montserrat">
          Loading . . .
        </p>
      </section>
    );
  }
};

export default ShowDetails;
