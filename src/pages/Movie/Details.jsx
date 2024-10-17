import { useOutletContext } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import noImage from "../../assets/images/no-image.svg";

const Details = () => {
  const { movie } = useOutletContext();
  useDocumentTitle(`Details | ${movie.title}`);

  if (movie) {
    // GET GENRES
    const genreElements = movie.genres.map((genre) => {
      return <span key={genre.id}>{genre.name}</span>;
    });

    //GET SPOKEN LANGUAGES
    const spokenLanguages = movie.spoken_languages.map((language) => {
      return (
        <span key={movie.spoken_languages.indexOf(language)}>
          {language.english_name}
        </span>
      );
    });

    //GET PRODUCTION COUNTRIES
    const countries = movie.production_countries.map((country) => {
      return (
        <span key={movie.production_countries.indexOf(country)}>
          {country.name}
        </span>
      );
    });

    return (
      <div className="font-montserrat font-normal leading-normal text-black text-sm md:text-base tracking-wide">
        {/* STATUS */}
        <p>
          Status: <span className="font-light">{movie.status}</span>
        </p>

        {/* RELEASE DATE */}
        <p>
          {movie.status === "Released" ? "Released" : "To be released on"}:{" "}
          <span className="font-light">{movie.release_date}</span>
        </p>

        {/* RUNTIME */}
        <p>
          Runtime: <span className="font-light">{movie.runtime} minutes</span>
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

        {/* BUDGET */}
        <p>
          Budget:{" "}
          <span className="font-light">
            {movie.budget === 0
              ? "Not available"
              : `$${movie.budget.toLocaleString()}`}
          </span>
        </p>

        {/* REVENUE */}
        <p>
          Revenue:{" "}
          <span className="font-light">
            {movie.revenue === 0
              ? "Not available"
              : `$${movie.revenue.toLocaleString()}`}
          </span>
        </p>

        {/* PRODUCTION COMPANIES */}
        <div>
          <p>Production Companies:</p>
          <div className="flex gap-4 py-2">
            {movie.production_companies.map((company) => {
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
        <h1 className="text-xl font-montserrat">Loading . . .</h1>
      </section>
    );
  }
};

export default Details;
