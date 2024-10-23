/* eslint-disable react/prop-types */
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import MovieCard from "../cards/MovieCard";

const Slider = ({ arr }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const elements = arr.map((item) => {
    return (
      <div key={item.id} className="w-[300px]">
        <MovieCard
          className="react-multi-carousel-item react-multi-carousel-list "
          key={item.id}
          movie={item}
          id={item.id}
          image={item.poster_path}
          title={item.title}
          released={item.release_date}
          voteAverage={item.vote_average}
          voteCount={item.vote_count}
          overview={item.overview}
        />
      </div>
    );
  });

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={false}
      responsive={responsive}
      centerMode={true}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      // ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={false}
      autoPlaySpeed={10000}
      keyBoardControl={true}
      transitionDuration={0}
      containerClass="carousel-container"
      itemClass="carousel-item-padding-40-px">
      {elements}
    </Carousel>
  );
};

export default Slider;
