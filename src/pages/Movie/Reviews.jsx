import { useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { movie } = useOutletContext();
  useDocumentTitle(`${movie.title} | Reviews`);
  const [expandedReviews, setExpandedReviews] = useState({});

  const fetchReviews = async () => {
    const creditsUrl = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;

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
      await fetch(creditsUrl, options)
        .then((res) => res.json())
        .then((data) => setReviews(data.results));
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const formatDate = (data) => {
    const date = new Date(data);

    // Get the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Format the date and time
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    return `Written on ${formattedDate} at ${formattedTime}`;
  };

  const toggleReviewExpansion = (reviewId) => {
    setExpandedReviews((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId],
    }));
  };

  if (loading) {
    return (
      <section>
        <h1 className="text-xl font-montserrat">Loading . . .</h1>
      </section>
    );
  } else if (reviews.length === 0) {
    return (
      <section>
        <p className="text-base tracking-wide font-montserrat">No reviews</p>
      </section>
    );
  } else {
    return (
      <section className="text-black font-montserrat">
        <div className="flex flex-col gap-4 lg:w-[80%]">
          {reviews.map((review) => {
            const isLongText = review.content.length > 300;
            const isExpanded = expandedReviews[review.id] || false;

            return (
              <div
                key={review.id}
                className="flex flex-col gap-4 justify-start items-start md:flex-row md:items-center shadow-md p-3 rounded-lg">
                {review.author_details.avatar_path === null ? (
                  <img
                    src="/src/assets/images/no-image.svg"
                    alt="no image"
                    className="object-cover w-[65px] h-[65px] border rounded-full theme-gradient"
                  />
                ) : (
                  <img
                    src={`https://image.tmdb.org/t/p/original/${review.author_details.avatar_path}`}
                    alt={`${review.author} avatar`}
                    className="object-cover w-[65px] h-[65px] border rounded-full"
                  />
                )}
                <div className="font-montserrat">
                  <p className="leading-3 text-base">{review.author}</p>
                  <small className="text-xs italic font-light">
                    {formatDate(review.created_at)}
                  </small>
                  <p className="font-light text-sm">
                    <span>
                      {isExpanded || !isLongText
                        ? review.content
                        : `${review.content.slice(0, 300)} . . .`}
                    </span>
                    {"  "}
                    <span>
                      {isLongText && (
                        <button
                          onClick={() => toggleReviewExpansion(review.id)}
                          className="text-light-blue tracking-wider text-sm hover:underline">
                          {isExpanded ? "Show Less" : "Read More"}
                        </button>
                      )}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
};

export default Reviews;
