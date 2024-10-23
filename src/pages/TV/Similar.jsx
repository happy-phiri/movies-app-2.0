/* eslint-disable react/prop-types */

import ShowCard from "../../components/cards/ShowCard";

const Similar = ({ recommendations }) => {
  return (
    <section className="mt-10 pt-4 border-t border-t-slate-200">
      <h2 className="font-montserrat font-medium text-2xl mb-2 tracking-wide">
        Similar Shows
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 max-md:gap-2 gap-4">
        {recommendations.map((recommendation) => {
          return (
            <ShowCard
              key={recommendation.id}
              movie={recommendation}
              id={recommendation.id}
              image={recommendation.poster_path}
              title={recommendation.name || recommendation.title}
              released={
                recommendation.first_air_date || recommendation.release_date
              }
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

export default Similar;
