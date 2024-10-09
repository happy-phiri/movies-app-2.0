import { useOutletContext } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

const Details = () => {
  const { movie } = useOutletContext();
  useDocumentTitle(`${movie.title} | Details`);

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
      <div className="font-montserrat text-black text-sm md:text-base tracking-wide">
        {/* RELEASE DATE */}
        <p className="font-normal leading-normal">
          {movie.status === "Released" ? "Released" : "To be released on"}:{" "}
          <span className="font-light">{movie.release_date}</span>
        </p>

        {/* RUNTIME */}
        <p className="font-normal leading-normal">
          Runtime: <span className="font-light">{movie.runtime} minutes</span>
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

        {/* BUDGET */}
        <p className="font-normal leading-normal">
          Budget:{" "}
          <span className="font-light">${movie.budget.toLocaleString()}</span>
        </p>

        {/* REVENUE */}
        <p className="font-normal leading-normal">
          Revenue:{" "}
          <span className="font-light">${movie.revenue.toLocaleString()}</span>
        </p>

        {/* PRODUCTION COMPANIES */}
        <div>
          <p className="font-normal leading-normal">Production Companies:</p>
          <div className="flex gap-3 py-2">
            {movie.production_companies.map((company) => {
              return (
                <div key={company.id} className="">
                  {company.logo_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${company.logo_path}`}
                      alt={company.name}
                      className="theme-gradient object-contain w-[80px] h-[80px] rounded-full mx-auto"
                    />
                  ) : (
                    <img
                      src="/src/assets/images/no_image.png"
                      alt="no image"
                      className="theme-gradient rounded-full mx-auto w-[80px] h-[80px] object-fit bg-transparent"
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
