import { useLoaderData, useSearchParams } from "react-router-dom";
import useDocumentTitle from "../Hooks/useDocumentTitle";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import PersonCard from "../components/cards/PersonCard";
import { fetchPeople } from "../utils/api";

export const loader = ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  return fetchPeople(page);
};

const People = () => {
  const data = useLoaderData();
  const people = data.results;
  const totalPages = data.total_pages;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;
  useDocumentTitle("People | Popular TV & Movie Personalities");

  const handleNextPage = () => {
    setSearchParams({ page: page + 1 });
  };

  const handlePrevPage = () => {
    setSearchParams({ page: page - 1 });
  };

  return (
    <section className="max-container pt-28 font-montserrat small-screen-padding mb-16">
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
};

export default People;
