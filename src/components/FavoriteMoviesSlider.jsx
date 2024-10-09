/* eslint-disable react/prop-types */
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MdDelete } from "react-icons/md";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";

const FavoriteMoviesSlider = ({ arr }) => {
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

  const { removeFromFavorites } = useGlobalContext();

  const elements = arr.map((item) => {
    return (
      <div key={item.id} className="w-[150px]">
        <Link to={`${item.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
            alt=""
            className="w-[130px] h-auto rounded-lg relative"
          />
          <p className="font-montserrat text-white text-xs mt-1">
            {item.title}
          </p>
        </Link>
        <MdDelete
          onClick={() => removeFromFavorites(item)}
          className="text-2xl fixed top-2 right-6 cursor-pointer text-white hover:text-red-700"
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
      // ssr={true} // means to render carousel on server-side.
      infinite={false}
      // autoPlay={this.props.deviceType !== "mobile" ? true : false}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      // customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      // removeArrowOnDeviceType={["tablet", "mobile"]}
      // deviceType={this.props.deviceType}
      // dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px">
      {elements}
    </Carousel>
  );
};

export default FavoriteMoviesSlider;
