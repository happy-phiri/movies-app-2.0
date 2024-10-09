import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useDocumentTitle from "../Hooks/useDocumentTitle";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const People = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState("");
  useDocumentTitle("Popular People Today");

  const fetchPeople = async (page) => {
    const peopleUrl = `https://api.themoviedb.org/3/person/popular?language=en-US&page=${page}`;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZGU1OWQ1MGEzYTdhYjhiYmEyOWZlOTBmYzIzOGI0ZiIsIm5iZiI6MTcyNDkyMzMyMy41OTE0MjgsInN1YiI6IjYxNmZiYjYwYmYwOWQxMDA2NDNlMmM5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PHErdJsQNMVwzlYgQXixTuN0pgmYTd6Uo_ElbeYKxwM",
      },
    };

    try {
      setLoading(true);
      await fetch(peopleUrl, options)
        .then((res) => res.json())
        .then((data) => {
          setPeople(data.results);
          setTotalPages(data.total_pages);
          console.log(data);
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPeople(page);
  }, [page]);

  const handleNextPage = () => {
    // setPage((prevState) => prevState + 1);
    setSearchParams({ page: page + 1 });
  };

  const handlePrevPage = () => {
    // setPage((prevState) => prevState - 1);
    setSearchParams({ page: page - 1 });
  };

  if (loading) {
    return (
      <section className="max-container pt-28">
        <h1 className="text-2xl font-montserrat small-screen-padding">
          Loading . . .
        </h1>
      </section>
    );
  } else {
    return (
      <section className="max-container pt-28 font-montserrat small-screen-padding">
        <h1 className="tracking-wider text-2xl lg:text-4xl mb-4">
          Popular People Today
        </h1>
        <div className="grid place-content-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-10">
          {people.map((person) => {
            return (
              <div
                key={person.id}
                className=" cursor-pointer shadow-md shadow-slate-300 rounded-b-md hover:scale-95 duration-200">
                <Link
                  to={`/actors/${person.id}`}
                  state={{ knownFor: person.known_for }}>
                  {person.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                      alt={person.original_name}
                      className="rounded-t-md max-md:w-[320px]"
                    />
                  ) : (
                    <img
                      src="/src/assets/images/no_image.png"
                      alt="no image"
                      className="min-h-[360px] object-contain"
                    />
                  )}

                  <p className="text-center px-2 py-3">
                    {person.original_name}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="text-center font-montserrat border-t border-gray-300 pt-5">
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
      </section>
    );
  }
};

export default People;
