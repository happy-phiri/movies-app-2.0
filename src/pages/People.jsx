import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useDocumentTitle from "../Hooks/useDocumentTitle";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import PersonCard from "../components/PersonCard";

const People = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState("");
  useDocumentTitle("People | Popular TV & Movie Personalities");

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
    setSearchParams({ page: page + 1 });
  };

  const handlePrevPage = () => {
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
              <PersonCard
                key={person.id}
                id={person.id}
                image={person.profile_path}
                name={person.name}
              />
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
