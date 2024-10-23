import { useOutletContext, useParams } from "react-router-dom";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import CharacterCard from "../../../components/cards/CharacterCard";

const GuestStars = () => {
  const { episodeNumber, seasonNumber } = useParams();
  const { show, episode } = useOutletContext();
  useDocumentTitle(
    episode
      ? `Guest Stars | ${show.name} | Season ${seasonNumber} | Episode ${episodeNumber}`
      : `${show.name} | Season ${seasonNumber} | Episode ${episodeNumber}`
  );

  return (
    <section>
      {episode ? (
        <div className="text-black font-montserrat">
          <div className="flex gap-3 flex-wrap max-sm:justify-center py-2">
            {episode.guest_stars.length > 0 ? (
              episode.guest_stars.map((actor) => {
                return (
                  <CharacterCard
                    key={actor.id}
                    id={actor.id}
                    image={actor.profile_path}
                    name={actor.name}
                    character={actor.character}
                  />
                );
              })
            ) : (
              <p className="tracking-wide text-gray-700 text-sm">
                No guest stars found
              </p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-xl font-montserrat">Loading . . .</p>
      )}
    </section>
  );
};

export default GuestStars;
