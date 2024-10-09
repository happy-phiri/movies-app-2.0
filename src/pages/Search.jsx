import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useDocumentTitle from "../Hooks/useDocumentTitle";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputText, setInputText] = useState("");
  //   const [searchTerm, setSearchTerm] = useState("");
  const searchTerm = searchParams.get("query") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const page = parseInt(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState("");
  const [totalResults, setTotalResults] = useState("");
  const pageTitle = searchTerm ? `Results for ${searchTerm}` : "Search Movies";
  useDocumentTitle(pageTitle);

  const fetchResults = async (term, page) => {
    if (!term) return;
    const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${term}&include_adult=false&language=en-US&page=${page}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNzUzMTY1OS4zNTc4NzcsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.138AHI3CPUjS-8J3esNHeh9q7UvisDmRqPjRv1YkTgg",
      },
    };

    try {
      setLoading(true);
      await fetch(searchUrl, options)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.results);
          setTotalPages(data.total_pages);
          setTotalResults(data.total_results);
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResults(searchTerm, page);
  }, [searchTerm, page]);

  const handleNextPage = () => {
    setSearchParams({ query: searchTerm, page: page + 1 });
  };

  const handlePrevPage = () => {
    setSearchParams({ query: searchTerm, page: page - 1 });
  };

  const handleInput = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ query: inputText, page: 1 });
    setInputText("");
  };

  const handleReset = () => {
    setSearchParams({});
    setInputText("");
    setResults([]);
    setTotalPages("");
    setTotalResults("");
  };

  return (
    <section className="max-container small-screen-padding pt-28 pb-10">
      <form className="mb-5" onSubmit={handleSubmit}>
        <div className="border border-gray-300 rounded-3xl pl-4 pr-1 py-1 flex justify-between gap-2">
          <label htmlFor="search" className="hidden">
            Search
          </label>
          <input
            type="text"
            placeholder="Search Movies"
            id="search"
            onChange={handleInput}
            value={inputText}
            autoComplete="off"
            className="w-full font-montserrat text-gray-600 tracking-wide outline-none placeholder:font-montserrat"
          />
          <button className="py-1 px-3 font-montserrat font-normal rounded-2xl tracking-wide text-[#90cea1] border border-[#90cea1] hover:text-white hover:theme-gradient md:w-[135px]">
            Search
          </button>
        </div>
      </form>

      {results.length === 0 ? (
        <p className="font-montserrat text-sm text-gray-400 italic">
          {loading ? "Loading . . ." : "Search Results will appear here . . ."}
        </p>
      ) : (
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-montserrat text-xl  tracking-wide">
              {totalResults} {totalResults > 1 ? "results" : "result"} found for{" "}
              <span className="italic">{searchTerm.toLocaleUpperCase()}</span>
            </h2>
            <button
              onClick={handleReset}
              className="py-1 px-3 font-montserrat font-normal text-xs rounded-2xl tracking-wide text-[#e57373] border border-[#e57373] hover:text-white hover:border-transparent hover:bg-[#e57373]">
              Clear
            </button>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {results.map((result) => {
              return (
                <div
                  key={result.id}
                  className="shadow-md shadow-slate-300 rounded-b-lg hover:scale-95 duration-200">
                  <Link to={`/${result.id}`}>
                    {result.poster_path === null ? (
                      <img
                        src="/src/assets/images/no_image.png"
                        alt="no image"
                        className="min-h-[280px] object-contain"
                      />
                    ) : (
                      <img
                        src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                        alt={result.title}
                        className="rounded-t-lg min-h-[280px] object-contain"
                      />
                    )}

                    <h3 className="text-center text-base max-sm:text-sm font-montserrat leading-none px-2 py-3">
                      {result.title || result.name}
                    </h3>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}
      {searchTerm && (
        <div className="text-center font-montserrat border-t border-gray-300 mt-8 pt-5">
          <p>
            Page {page} of {totalPages}
          </p>
          <div className="flex justify-center items-center gap-7 mt-2">
            {page > 1 && (
              <button
                onClick={handlePrevPage}
                className="text-2xl hover:text-light-green">
                <GrLinkPrevious />
              </button>
            )}
            {page < totalPages && (
              <button
                onClick={handleNextPage}
                className="text-2xl hover:text-light-green">
                <GrLinkNext />
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Search;
