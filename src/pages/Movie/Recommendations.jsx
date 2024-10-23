/* eslint-disable react/prop-types */

import MovieCard from "../../components/cards/MovieCard";

const Recommendations = ({ recommendations }) => {
  return (
    <section className="mt-10 pt-4 border-t border-t-slate-200">
      <h2 className="font-montserrat font-medium text-2xl mb-2 tracking-wide">
        Similar Movies
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-md:gap-2 gap-4">
        {recommendations.map((recommendation) => {
          return (
            <MovieCard
              key={recommendation.id}
              movie={recommendation}
              id={recommendation.id}
              image={recommendation.poster_path}
              title={recommendation.original_title}
              released={recommendation.release_date}
              voteAverage={recommendation.vote_average}
              voteCount={recommendation.vote_count}
              overview={recommendation.overview}
              className="w-[250px]"
            />
          );
        })}
      </div>
    </section>
  );
};

export default Recommendations;
