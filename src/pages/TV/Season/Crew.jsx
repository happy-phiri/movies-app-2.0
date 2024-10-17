import { useOutletContext, useParams } from "react-router-dom";
import useDocumentTitle from "../../../Hooks/useDocumentTitle";
import CharacterCard from "../../../components/CharacterCard";

const Crew = () => {
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
            {episode.crew.length > 0 ? (
              episode.crew.map((person) => {
                return (
                  <CharacterCard
                    key={person.id}
                    id={person.id}
                    image={person.profile_path}
                    name={person.name}
                    character={person.job}
                  />
                );
              })
            ) : (
              <p className="tracking-wide text-gray-700 text-sm">
                No crew members found
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

export default Crew;
