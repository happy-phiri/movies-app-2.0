import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo-hp.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { BsSearch } from "react-icons/bs";

const Header = () => {
  const [toggleNav, setToggleNav] = useState(false);

  const handleToggleNav = () => {
    setToggleNav((prevState) => !prevState);
  };

  return (
    <nav className="w-full py-5 small-screen-padding shadow-md z-40 bg-[rgba(0,0,0,0.6)] absolute">
      <div className="max-container flex justify-between items-center">
        <NavLink to="/" end>
          <img src={logo} alt="tmdb logo" width={100} height={100} />
        </NavLink>

        <div
          className={`font-montserrat ${
            toggleNav
              ? "w-full"
              : "max-md:w-0 max-md:overflow-hidden max-md:duration-0"
          } duration-500 flex pt-40 md:p-0 flex-col md:flex-row items-center justify-start gap-9 md:justify-end md:gap-5 h-dvh md:h-full md:w-full md:relative text-white md:text-black bg-[rgba(0,0,0,0.8)] md:bg-inherit absolute top-0 right-0`}>
          <NavLink
            to="now-playing"
            onClick={() => setToggleNav(false)}
            className={({ isActive }) =>
              isActive
                ? "theme-gradient-text font-semibold"
                : "hover:theme-gradient-text font-light text-white"
            }>
            Now Playing
          </NavLink>

          <NavLink
            to="popular"
            onClick={() => setToggleNav(false)}
            className={({ isActive }) =>
              isActive
                ? "theme-gradient-text font-semibold"
                : "hover:theme-gradient-text font-light text-white"
            }>
            Popular
          </NavLink>

          <NavLink
            to="top-rated"
            onClick={() => setToggleNav(false)}
            className={({ isActive }) =>
              isActive
                ? "theme-gradient-text font-semibold"
                : "hover:theme-gradient-text font-light text-white"
            }>
            Top Rated
          </NavLink>

          <NavLink
            to="shows"
            onClick={() => setToggleNav(false)}
            className={({ isActive }) =>
              isActive
                ? "theme-gradient-text font-semibold"
                : "hover:theme-gradient-text font-light text-white"
            }>
            TV Shows
          </NavLink>

          <NavLink
            to="actors"
            onClick={() => setToggleNav(false)}
            className={({ isActive }) =>
              isActive
                ? "theme-gradient-text font-semibold"
                : "hover:theme-gradient-text font-light text-white"
            }>
            People
          </NavLink>

          <NavLink to="search">
            <BsSearch className="text-xl hover:scale-105 duration-300 font-light text-white" />
          </NavLink>
        </div>

        <div className="md:hidden absolute top-6 right-6 cursor-pointer">
          <button onClick={handleToggleNav} className="text-2xl text-white">
            {toggleNav ? <IoMdClose /> : <RxHamburgerMenu />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
