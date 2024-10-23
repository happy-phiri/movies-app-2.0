import { useState } from "react";
import { useOutletContext, useLoaderData } from "react-router-dom";
import useDocumentTitle from "../../Hooks/useDocumentTitle";
import DOMPurify from "dompurify"; //FORMATS HTML IN REVIEW TEXT
import { RiStarSFill } from "react-icons/ri";
import noImage from "../../assets/images/no-image.svg";
import { fetchTvShowReviews } from "../../utils/api";

export const loader = async ({ params }) => {
  const { id } = params;
  return fetchTvShowReviews(id);
};

const ShowReviews = () => {
  const reviews = useLoaderData();
  const { show } = useOutletContext();
  useDocumentTitle(`Reviews | ${show.name}`);
  const [expandedReviews, setExpandedReviews] = useState({});

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

  if (reviews.length === 0) {
    return (
      <section>
        <p className="text-base tracking-wide font-light font-montserrat">
          No reviews written yet.
        </p>
      </section>
    );
  } else {
    return (
      <section className="text-black font-montserrat">
        <div className="flex flex-col gap-4 lg:w-[80%]">
          {reviews.map((review) => {
            const isLongText = review.content.length > 300;
            const isExpanded = expandedReviews[review.id] || false;
            const sanitizedContent = DOMPurify.sanitize(review.content);

            return (
              <div
                key={review.id}
                className="flex flex-col gap-4 justify-start items-start md:flex-row md:items-center shadow-md p-3 rounded-lg">
                {review.author_details.avatar_path === null ? (
                  <img
                    src={noImage}
                    alt="no image"
                    className="object-cover w-[65px] h-[65px] border rounded-full"
                  />
                ) : (
                  <img
                    src={`https://image.tmdb.org/t/p/original/${review.author_details.avatar_path}`}
                    alt={`${review.author} avatar`}
                    className="object-cover w-[65px] min-w-[65px] h-[65px] border rounded-full"
                  />
                )}
                <div className="font-montserrat">
                  <div>
                    <p className="leading-3 text-base">{review.author}</p>
                    <small className="text-xs italic font-light">
                      {formatDate(review.created_at)}
                    </small>
                    <p className="text-sm font-light flex items-center gap-1">
                      <span className="text-sm flex flex-row flex-nowrap">
                        <RiStarSFill className="text-yellow-400" />
                        <RiStarSFill className="text-yellow-400" />
                        <RiStarSFill className="text-yellow-400" />
                        <RiStarSFill className="text-yellow-400" />
                        <RiStarSFill className="text-yellow-400" />
                      </span>
                      <span>{review.author_details.rating}</span>
                    </p>
                  </div>

                  <div className="font-light text-sm">
                    <div
                      className="review-content"
                      dangerouslySetInnerHTML={{
                        __html:
                          isExpanded || !isLongText
                            ? sanitizedContent
                            : `${sanitizedContent.slice(0, 300)} . . .`,
                      }}
                    />
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
};

export default ShowReviews;
