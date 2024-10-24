import { useLoaderData } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import CharacterCard from "../../components/cards/CharacterCard";
import { fetchMovie, fetchMovieCredits } from "../../utils/api";

export const loader = async ({ params }) => {
  const { id } = params;
  const [movie, cast] = await Promise.all([
    fetchMovie(id),
    fetchMovieCredits(id),
  ]);
  return {
    movie: movie,
    cast: cast,
  };
};

const Cast = () => {
  const { movie, cast } = useLoaderData();
  useDocumentTitle(`Cast | ${movie.title}`);

  if (cast.length === 0) {
    return (
      <section>
        <p className="text-base tracking-wide font-montserrat">
          Cast not found
        </p>
      </section>
    );
  }
  return (
    <div className="flex gap-3 flex-wrap max-sm:justify-center py-2">
      {cast.map((actor) => {
        return (
          <CharacterCard
            key={actor.id}
            id={actor.id}
            image={actor.profile_path}
            name={actor.name}
            character={actor.character}
          />
        );
      })}
    </div>
  );
};

export default Cast;
